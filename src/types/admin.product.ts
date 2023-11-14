import { CreateProduct } from './product';

export interface AdminCreateProduct extends CreateProduct {
  printShopId: number;
}
