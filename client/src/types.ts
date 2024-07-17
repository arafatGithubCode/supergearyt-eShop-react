export interface IProductProps {
  brand: string;
  category: string;
  colors: [string];
  description: string;
  discountedPrice: number;
  images: [string];
  isNew: boolean;
  isStock: boolean;
  name: string;
  overView: string;
  quantity: number;
  rating: number;
  regularPrice: number;
  reviews: number;
  _base: string;
  _id: number;
}

export interface ICategoriesProps {
  description: string;
  image: string;
  _base: string;
  _id: number;
}
