export interface CreateProduct {
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
}
