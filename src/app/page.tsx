import { RestaurantCard } from "@/components/RestaurantCard";
import { restaurants } from "@/lib/data";
import { UtensilsCrossed } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16">
        <UtensilsCrossed className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight font-headline sm:text-6xl">
          Welcome to FlavorLink
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Your AI-powered guide to the best culinary experiences.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold tracking-tight font-headline mb-8">Our Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
}
