'use server';
/**
 * @fileOverview Summarizes a list of order items using AI for quick review and confirmation.
 *
 * - summarizeOrder - A function that takes a list of order items and returns a summarized version.
 * - OrderItem - The type for individual order items.
 * - OrderSummary - The type for the summarized order.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OrderItemSchema = z.object({
  name: z.string().describe('The name of the item ordered.'),
  quantity: z.number().describe('The quantity of the item ordered.'),
  price: z.number().describe('The price of the item.'),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

const OrderSummarySchema = z.object({
  summary: z.string().describe('A concise summary of the order items.'),
  totalPrice: z.number().describe('The total price of all items in the order.'),
});

export type OrderSummary = z.infer<typeof OrderSummarySchema>;

const OrderInputSchema = z.object({
  items: z.array(OrderItemSchema).describe('A list of order items to summarize.'),
});

export type OrderInput = z.infer<typeof OrderInputSchema>;

export async function summarizeOrder(input: OrderInput): Promise<OrderSummary> {
  return summarizeOrderFlow(input);
}

const orderSummaryPrompt = ai.definePrompt({
  name: 'orderSummaryPrompt',
  input: {schema: OrderInputSchema.extend({ totalPrice: z.number() })},
  output: {schema: OrderSummarySchema},
  prompt: `You are an AI assistant helping users review their order.
  Summarize the following order items into a single concise summary. The total price is {{totalPrice}}.

  Order Items:
  {{#each items}}
  - {{quantity}} x {{name}} - \${{price}}
  {{/each}}
  `,
});

const summarizeOrderFlow = ai.defineFlow(
  {
    name: 'summarizeOrderFlow',
    inputSchema: OrderInputSchema,
    outputSchema: OrderSummarySchema,
  },
  async input => {
    let totalPrice = 0;
    for (const item of input.items) {
      totalPrice += item.price * item.quantity;
    }

    const {output} = await orderSummaryPrompt({ ...input, totalPrice });
    if (!output) {
      throw new Error("Failed to get a summary from the AI.");
    }
    
    return {
      summary: output.summary,
      totalPrice,
    };
  }
);
