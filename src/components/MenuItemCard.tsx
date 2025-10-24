import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MenuItem } from '@/lib/types';
import { AddToCartButton } from '@/app/restaurants/[id]/_components/AddToCartButton';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex-grow">
        <CardHeader>
          <CardTitle className="font-headline">{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-lg text-primary">CA${item.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter>
           <AddToCartButton item={item} />
        </CardFooter>
      </div>
      <div className="relative h-48 w-full md:w-48 md:h-auto flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover md:rounded-r-lg md:rounded-l-none rounded-b-lg"
          data-ai-hint={item.imageHint}
        />
      </div>
    </Card>
  );
}
