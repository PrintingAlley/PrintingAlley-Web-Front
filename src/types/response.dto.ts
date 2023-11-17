export enum Provider {
  Google = 'google',
  Naver = 'naver',
  Kakao = 'kakao',
  Apple = 'apple',
}

export enum UserType {
  GENERAL = 'GENERAL',
  PRINTSHOP_OWNER = 'PRINTSHOP_OWNER',
  ADMIN = 'ADMIN',
}

export interface UserInterface {
  id: number;
  provider: Provider;
  userType: UserType;
  name: string;
  profileImage: string | null;
  email: string | null;
  printShops: PrintShopInterface[];
  createdAt: string;
  updateAt: string;
}

export interface TagInterface {
  id: number;
  name: string;
  image: string | null;
  parentId: number | null;
  children: TagInterface[];
}

export interface CategoryInterface {
  id: number;
  name: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface BookmarkInterface {
  id: number;
  createdAt: string;
  updatedAt: string;
  product: ProductWithTags;
}

export interface BookmarkGroupInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkGroupWithHasProduct {
  id: number;
  name: string;
  hasProduct: boolean;
  bookmarkId: number | null;
  bookmarkCount: number | null;
  recentImage: string | null;
}

export interface ProductInterface {
  id: number;
  name: string;
  size: string;
  paper: string;
  designer: string;
  introduction: string;
  description: string;
  mainImage: string;
  images: string[];
  viewCount: number;
  createdAt: string;
  updateAt: string;
}

export interface PrintShopInterface {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  email: string;
  homepage: string;
  introduction: string;
  logoImage: string | null;
  backgroundImage: string | null;
  latitude: string;
  longitude: string;
  businessHours: string;
  viewCount: number;
  createdAt: string;
  updateAt: string;
}

interface PrintShopReviewInterface {
  id: number;
  content: string;
  rating: number;
  images: string[] | null;
  createdAt: string;
  updateAt: string;
}

interface ProductReviewInterface {
  id: number;
  content: string;
  rating: number;
  images: string[] | null;
  createdAt: string;
  updateAt: string;
}

export interface ContentInterface {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updateAt: string;
}

export interface ProductWithTags extends ProductInterface {
  tags: TagInterface[];
}

export interface ProductDetail extends ProductInterface {
  printType: string;
  afterProcess: string;
  ownerId: number;
  tags: TagInterface[];
  category: CategoryInterface;
  printShop: PrintShopInterface;
  reviews: ProductReviewInterface[];
  isBookmarked: boolean;
  bookmarkCount: number;
}

export interface ProductReviewWithProduct extends ProductReviewInterface {
  product: ProductInterface;
}

export interface ProductReviewWithUser extends ProductReviewInterface {
  user: UserInterface;
}

export interface PrintShopWithTags extends PrintShopInterface {
  tags: TagInterface[];
}

export interface PrintShopDetail extends PrintShopInterface {
  printType: string;
  afterProcess: string;
  afterProcessBinding: string;
  ownerId: number;
  tags: TagInterface[];
  products: ProductInterface[];
  reviews: PrintShopReviewInterface[];
}

export interface PrintShopReviewWithPrintShop extends PrintShopReviewInterface {
  printShop: PrintShopInterface;
}

export interface PrintShopReviewWithUser extends PrintShopReviewInterface {
  user: UserInterface;
}

export interface BookmarkGroupWithExtra extends BookmarkGroupInterface {
  bookmarkCount: number;
  recentImage: string | null;
}

export interface BookmarkGroupDetail extends BookmarkGroupInterface {
  bookmarks: BookmarkInterface[];
}

// GET /user
export interface GetUserResponse {
  user: UserInterface;
}

// GET /user/print-shop-review
export interface GetUserPrintShopReviewsResponse {
  printShopReviews: PrintShopReviewWithPrintShop[];
}

// GET /user/product-review
export interface GetUserProductReviewsResponse {
  productReviews: ProductReviewWithProduct[];
}

// GET /product
export interface GetProductsResponse {
  products: ProductWithTags[];
  totalCount: number;
}

// GET /product/:id
export interface GetProductResponse {
  product: ProductDetail;
  bookmarkId: number | null;
}

// GET /product/:id/review
export interface GetProductReviewsResponse {
  productReviews: ProductReviewWithUser[];
}

// GET /print-shop
export interface GetPrintShopsResponse {
  printShops: PrintShopWithTags[];
  totalCount: number;
}

// GET /print-shop/:id
export interface GetPrintShopResponse {
  printShop: PrintShopDetail;
}

// GET /print-shop/:id/review
export interface GetPrintShopReviewsResponse {
  printShopReviews: PrintShopReviewWithUser[];
}

// GET /bookmark/group
export interface GetBookmarkGroupsResponse {
  bookmarkGroups: BookmarkGroupWithExtra[];
}

// GET /bookmark/group/:id
export interface GetBookmarkGroupResponse {
  bookmarkGroup: BookmarkGroupDetail;
}

// GET /bookmark/group/has-product/:productId
export interface GetBookmarkGroupsWithHasProductResponse {
  bookmarkGroups: BookmarkGroupWithHasProduct[];
}

// GET /tag
export interface GetTagsResponse {
  hierarchies: TagInterface[];
}

// GET /tag/:id
export interface GetTagResponse {
  tag: TagInterface;
}

// GET /category
export interface GetCategoriesResponse {
  categories: CategoryInterface[];
}

// GET /content
export interface GetContentsResponse {
  contents: ContentInterface[];
}

// GET /content/:id
export interface GetContentResponse {
  content: ContentInterface;
}
