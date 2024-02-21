export type Product = {
  id: number;
  attributes: ProductAttributes;
};

export type StateProduct = {
  product: Product;
  quantity: number;
  price: number;
  id: string;
};

export type ProductAttributes = {
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  image: {
    data: {
      attributes: {
        url: string;
      };
    }[];
  };
  availableSizes: availableSizes;
  availableColors: availableColors;
  size?: string;
  color?: string;
};

export type availableSizes = {
  id: number;
  ExtraSmall: number;
  Small: number;
  Medium: number;
  Large: number;
  ExtraLarge: number;
};
export type availableColors = {
  id: number;
  red: boolean;
  green: boolean;
  black: boolean;
  blue: boolean;
  yellow: boolean;
};
