export type ApparelSize = 'S' | 'M' | 'L' | 'XL';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  availableStock: number;
  description: string;
  sizes: ApparelSize[];
  colors: string[];
  image: string;
  bgClass: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  season: string;
  itemsCount: number;
  image: string;
  tag: string;
}
