import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NotFound() {
  const notFoundImage = PlaceHolderImages.find(img => img.id === '404-image');
  
  return (
    <div className="container mx-auto px-4 py-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
      {notFoundImage && (
        <Image 
          src={notFoundImage.imageUrl} 
          alt="Not found" 
          width={200}
          height={200}
          className="mb-8 opacity-50"
          data-ai-hint={notFoundImage.imageHint}
        />
      )}
      <h1 className="text-4xl font-bold font-headline mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Oops! The page you're looking for seems to have gotten lost in the kitchen.
      </p>
      <Button asChild>
        <Link href="/">Go back to the homepage</Link>
      </Button>
    </div>
  );
}
