import type { Restaurant } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    return {
      url: 'https://picsum.photos/seed/fallback/600/400',
      hint: 'food',
    };
  }
  return {
    url: image.imageUrl,
    hint: image.imageHint,
  };
};

export const restaurants: Restaurant[] = [
  {
    id: 'bella-italia',
    name: 'Bella Italia',
    description: 'Authentic Italian cuisine in a cozy and romantic atmosphere.',
    longDescription: 'Step into Bella Italia and be transported to the heart of Italy. Our family-owned restaurant prides itself on using the freshest ingredients, traditional recipes passed down through generations, and a passion for creating memorable dining experiences. From our handmade pasta to our wood-fired pizzas, every dish is a celebration of Italian flavor.',
    image: getImage('restaurant-1').url,
    imageHint: getImage('restaurant-1').hint,
    menu: [
      {
        id: 'pasta-carbonara',
        name: 'Spaghetti Carbonara',
        description: 'Classic spaghetti with pancetta, eggs, pecorino cheese, and black pepper.',
        price: 18.50,
        image: getImage('menu-pasta').url,
        imageHint: getImage('menu-pasta').hint,
      },
      {
        id: 'margherita-pizza',
        name: 'Margherita Pizza',
        description: 'Wood-fired pizza with San Marzano tomatoes, fresh mozzarella, basil, and olive oil.',
        price: 16.00,
        image: getImage('menu-pizza').url,
        imageHint: getImage('menu-pizza').hint,
      },
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'A creamy dessert of espresso-soaked ladyfingers and mascarpone cheese.',
        price: 9.00,
        image: getImage('menu-tiramisu').url,
        imageHint: getImage('menu-tiramisu').hint,
      },
    ],
  },
  {
    id: 'sushi-house',
    name: 'Sushi House',
    description: 'Modern Japanese restaurant specializing in fresh sushi and sashimi.',
    longDescription: 'Sushi House offers a serene and contemporary dining experience. Our master chefs skillfully prepare each dish using only the highest quality, sustainably sourced seafood. Explore our extensive menu of classic and innovative sushi rolls, delicate sashimi, and hot Japanese entrees.',
    image: getImage('restaurant-2').url,
    imageHint: getImage('restaurant-2').hint,
    menu: [
      {
        id: 'sushi-platter',
        name: 'Chef\'s Sushi Platter',
        description: 'A curated selection of 8 nigiri and a California roll.',
        price: 28.00,
        image: getImage('menu-sushi-set').url,
        imageHint: getImage('menu-sushi-set').hint,
      },
      {
        id: 'tonkotsu-ramen',
        name: 'Tonkotsu Ramen',
        description: 'Rich and creamy pork broth ramen with chashu pork, soft-boiled egg, and noodles.',
        price: 17.00,
        image: getImage('menu-ramen').url,
        imageHint: getImage('menu-ramen').hint,
      },
      {
        id: 'mochi-ice-cream',
        name: 'Mochi Ice Cream',
        description: 'A trio of assorted mochi ice cream flavors.',
        price: 8.00,
        image: getImage('menu-mochi').url,
        imageHint: getImage('menu-mochi').hint,
      },
    ],
  },
  {
    id: 'burger-barn',
    name: 'Burger Barn',
    description: 'Classic American comfort food, serving the best burgers in town.',
    longDescription: 'Welcome to Burger Barn, where we believe in good old-fashioned comfort food. Our burgers are made from 100% grass-fed beef, our fries are hand-cut daily, and our milkshakes are thick and creamy. It\'s the perfect spot for a casual meal with family and friends.',
    image: getImage('restaurant-3').url,
    imageHint: getImage('restaurant-3').hint,
    menu: [
      {
        id: 'classic-cheeseburger',
        name: 'Classic Cheeseburger',
        description: 'A juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce.',
        price: 14.50,
        image: getImage('menu-burger').url,
        imageHint: getImage('menu-burger').hint,
      },
      {
        id: 'strawberry-milkshake',
        name: 'Strawberry Milkshake',
        description: 'A thick and creamy milkshake made with real strawberries.',
        price: 7.50,
        image: getImage('menu-milkshake').url,
        imageHint: getImage('menu-milkshake').hint,
      },
      {
        id: 'apple-pie',
        name: 'Apple Pie a la Mode',
        description: 'Warm apple pie served with a scoop of vanilla ice cream.',
        price: 8.50,
        image: getImage('menu-pie').url,
        imageHint: getImage('menu-pie').hint,
      },
    ],
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find((r) => r.id === id);
};
