export interface CreateProduct {
  name: string;
  priceInfo: string | null;
  introduction: string;
  description: string;
  mainImage: string;
  images: string[];
  tagIds: number[];
  categoryId: number;
  printShopId: number;
}
