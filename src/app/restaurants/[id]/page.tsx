import { getRestaurantById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RecommendationTool } from '@/components/RecommendationTool';

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = getRestaurantById(params.id);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader>
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  className="object-cover rounded-md"
                  data-ai-hint={restaurant.imageHint}
                   sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <CardTitle className="font-headline text-3xl">{restaurant.name}</CardTitle>
              <CardDescription>{restaurant.longDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationTool restaurant={restaurant} />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold font-headline mb-6">Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurant.menu.map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    data-ai-hint={item.imageHint}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold text-lg text-primary">${item.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
