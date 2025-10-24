export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
};

export type Restaurant = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  image: string;
  imageHint: string;
  menu: MenuItem[];
};
