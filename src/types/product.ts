export interface CreateProduct {
  name: string;
  size: string;
  paper: string;
  afterProcess: string;
  designer: string;
  introduction: string;
  description: string;
  mainImage: string;
  images: string[];
  tagIds: number[];
  categoryId: number;
  printShopId: number;
}
