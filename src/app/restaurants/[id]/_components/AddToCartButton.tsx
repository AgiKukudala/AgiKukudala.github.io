"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { MenuItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

export function AddToCartButton({ item }: { item: MenuItem }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} was added to your order.`,
    });
  };

  return (
    <Button className="w-full" onClick={handleAddToCart}>
      <Plus className="mr-2 h-4 w-4" /> Add to Cart
    </Button>
  );
}
