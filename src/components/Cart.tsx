"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Loader2, Minus, Plus, Trash2, Wand2, ShoppingCart } from 'lucide-react';
import { summarizeOrder, type OrderSummary, type OrderItem } from '@/ai/flows/ai-powered-order-summarization';
import { useToast } from '@/hooks/use-toast';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();
  const { toast } = useToast();
  const [summary, setSummary] = useState<OrderSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSummarizeOrder = async () => {
    setIsLoadingSummary(true);
    setSummary(null);
    const orderItems: OrderItem[] = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    try {
      const result = await summarizeOrder({ items: orderItems });
      setSummary(result);
    } catch (error) {
      console.error("Failed to summarize order:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate order summary. Please try again.",
      });
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Your Cart ({cartCount})</SheetTitle>
      </SheetHeader>
      {cartItems.length > 0 ? (
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-grow pr-4 -mr-6 my-4">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md object-cover aspect-square" data-ai-hint={item.imageHint} />
                  <div className="flex-grow">
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                      <Input type="number" readOnly value={item.quantity} className="h-7 w-12 text-center" />
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-auto">
            <Separator className="my-4" />
            <div className="space-y-4">
              <Button onClick={handleSummarizeOrder} disabled={isLoadingSummary} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoadingSummary ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Summarize with AI
              </Button>
              {isLoadingSummary && <p className="text-sm text-center text-muted-foreground">Generating your order summary...</p>}
              {summary && (
                <div className="p-3 rounded-lg border bg-secondary/50">
                  <h4 className="font-semibold text-sm mb-1">AI Order Summary</h4>
                  <p className="text-sm text-secondary-foreground">{summary.summary}</p>
                </div>
              )}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <SheetFooter className="mt-6">
              <Button className="w-full" size="lg">Checkout</Button>
            </SheetFooter>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="font-semibold">Your cart is empty</p>
          <p className="text-sm text-muted-foreground">Add items to see them here.</p>
        </div>
      )}
    </>
  );
}
