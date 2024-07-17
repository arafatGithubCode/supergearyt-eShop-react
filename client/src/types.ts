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
  name: string;
  description: string;
  image: string;
  _base: string;
  _id: number;
}

export interface IHighlights {
  _id: number;
  name: string;
  title: string;
  buttonTitle: string;
  image: string;
  _base: string;
  color: string;
}
