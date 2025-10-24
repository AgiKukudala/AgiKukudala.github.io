"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import type { Restaurant } from '@/lib/types';
import { getPersonalizedRecommendations } from '@/ai/flows/personalized-recommendations';
import { useToast } from '@/hooks/use-toast';

export function RecommendationTool({ restaurant }: { restaurant: Restaurant }) {
  const [restrictions, setRestrictions] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    if (!restrictions.trim()) {
      toast({
        variant: 'destructive',
        title: 'Input needed',
        description: 'Please enter your dietary preferences.',
      });
      return;
    }
    
    setIsLoading(true);
    setRecommendations([]);

    try {
      const menuItems = restaurant.menu.map(item => `${item.name}: ${item.description} - $${item.price.toFixed(2)}`);
      const result = await getPersonalizedRecommendations({
        restaurantDescription: restaurant.longDescription,
        menuItems: menuItems,
        dietaryRestrictions: restrictions,
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-accent shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-accent" />
          AI Dish Recommender
        </CardTitle>
        <CardDescription>
          Tell us your dietary needs (e.g., "vegetarian", "gluten-free", "nut allergy") and we'll suggest some dishes!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., I'm lactose intolerant and don't eat spicy food."
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
        />
        <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Get Recommendations
        </Button>
        {recommendations.length > 0 && (
          <div className="space-y-2 pt-2">
            <h4 className="font-semibold">Our Suggestions:</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-foreground/80">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
