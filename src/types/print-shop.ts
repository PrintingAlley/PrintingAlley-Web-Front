export interface PrintShop {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  homepage: string;
  representative: string;
  introduction: string;
  logoImage: string;
  backgroundImage: string;
  latitude: string;
  longitude: string;
  tags: Tag[];
  createdAt: Date;
  updateAt: Date;
}

export interface Tag {
  id: number;
  name: string;
  image: string | null;
  parent_id: number | null;
  children: Tag[];
}
