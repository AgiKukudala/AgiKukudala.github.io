import { MenuItemCard } from "@/components/MenuItemCard";
import { popularItems } from "@/lib/data";
import { UtensilsCrossed } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

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
        <h2 className="text-3xl font-bold tracking-tight font-headline mb-2">Popular Items</h2>
        <p className="text-muted-foreground mb-8">The most commonly ordered items and dishes from this store</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="py-16 mt-16 bg-card border rounded-lg shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight font-headline mb-4">
            Optimize Your Online Ordering with AI
          </h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Interested in leveraging AI to boost your restaurant's efficiency and sales? Schedule a free consultation with our team.
          </p>
          <div className="mt-10 max-w-xl mx-auto">
             <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
