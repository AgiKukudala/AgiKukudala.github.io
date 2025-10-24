import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-us-hero');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-headline text-center mb-4 sm:text-5xl">About FlavorLink</h1>
          <p className="text-lg text-muted-foreground text-center mb-12">Connecting you to culinary delights with a touch of AI magic.</p>
          
          {aboutImage && (
            <div className="relative h-60 sm:h-80 rounded-lg overflow-hidden mb-12 shadow-lg">
              <Image 
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          <div className="space-y-8 text-base leading-7 text-foreground/90">
            <div>
              <h2 className="text-3xl font-bold font-headline text-primary">Our Founder</h2>
              <p className="mt-4">FlavorLink was founded by Agastya Kukudala, a current high school senior with a passion for integrating technology with entrepreneurship. His vision is to make personalized dining accessible to everyone, using AI to create a bridge between restaurants and diners.</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-headline text-primary">Our Mission</h2>
              <p className="mt-4">At FlavorLink, our mission is to revolutionize the way you discover and enjoy food. We believe that everyone deserves a personalized dining experience, tailored to their unique tastes and dietary needs. By integrating cutting-edge AI, we bridge the gap between diners and restaurants, making every meal a perfect match.</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold font-headline text-primary">Our Story</h2>
              <p className="mt-4">FlavorLink was born from a simple idea: what if ordering food could be smarter, simpler, and more satisfying? Our founders, a team of food lovers and tech innovators, were tired of the endless scrolling and guesswork involved in finding the right dish. They envisioned a platform that not only lists menus but understands them, providing intelligent recommendations that cater to individual preferences.</p>
              <p className="mt-4">From a small prototype to a growing platform, our journey has been fueled by a passion for food and technology. We partner with the best local restaurants to bring their creations to you, enhanced by an AI layer that makes your ordering experience seamless and delightful.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
