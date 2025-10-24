'use server';

/**
 * @fileOverview Personalized dish recommendations based on dietary restrictions and preferences.
 *
 * - getPersonalizedRecommendations - A function that generates personalized dish recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  restaurantDescription: z
    .string()
    .describe('The description of the restaurant including cuisine and ambiance.'),
  menuItems: z.array(z.string()).describe('A list of menu items with descriptions and prices.'),
  dietaryRestrictions: z
    .string()
    .describe('The dietary restrictions or preferences of the user (e.g., vegetarian, gluten-free, nut allergy).'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended dishes or modifications.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant that provides personalized dish recommendations based on dietary restrictions and preferences.

  Consider the following restaurant description:
  Restaurant Description: {{{restaurantDescription}}}

  And the following menu items:
  Menu Items: {{#each menuItems}}- {{{this}}}\n{{/each}}

  Given the user's dietary restrictions/preferences:
  Dietary Restrictions/Preferences: {{{dietaryRestrictions}}}

  Recommend dishes or modifications from the menu that would be suitable for the user. Explain why the recommendations are suitable.
  Format the output as a list of dish names and explanation.`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
