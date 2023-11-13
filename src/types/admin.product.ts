export interface AdminCreateProduct {
  name: string;
  size: string;
  paper: string;
  designer: string;
  introduction: string;
  description: string;
  mainImage: string;
  images: string[];
  tagIds: number[];
  categoryId: number;
  printShopId: number;
}
