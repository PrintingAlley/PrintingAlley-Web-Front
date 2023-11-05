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

interface BookmarkGroupInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInterface {
  id: number;
  name: string;
  size: string;
  paper: string;
  afterProcess: string;
  designer: string;
  introduction: string;
  description: string;
  mainImage: string;
  images: string[];
  createdAt: string;
  updateAt: string;
}

export interface PrintShopInterface {
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

export interface UserInterface {
  id: number;
  provider: string;
  userType: string;
  name: string;
  profileImage: string | null;
  email: string | null;
  createdAt: string;
  updateAt: string;
}

export interface ProductWithTags extends ProductInterface {
  tags: TagInterface[];
}

export interface ProductDetail extends ProductInterface {
  tags: TagInterface[];
  category: CategoryInterface;
  printShop: PrintShopInterface;
  reviews: ProductReviewInterface[];
  isBookmarked: boolean;
  bookmarkCount: number;
}

interface ProductReviewWithProduct extends ProductReviewInterface {
  product: ProductInterface;
}

export interface ProductReviewWithUser extends ProductReviewInterface {
  user: UserInterface;
}

export interface PrintShopDetail extends PrintShopInterface {
  products: ProductInterface[];
  reviews: PrintShopReviewInterface[];
}

interface PrintShopReviewWithPrintShop extends PrintShopReviewInterface {
  printShop: PrintShopInterface;
}

export interface PrintShopReviewWithUser extends PrintShopReviewInterface {
  user: UserInterface;
}

interface BookmarkGroupWithBookmarkCount extends BookmarkGroupInterface {
  bookmarkCount: number;
}

interface BookmarkGroupDetail extends BookmarkGroupInterface {
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
  printShops: PrintShopInterface[];
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
  bookmarkGroups: BookmarkGroupWithBookmarkCount[];
}

// GET /bookmark/group/:id
export interface GetBookmarkGroupResponse {
  bookmarkGroup: BookmarkGroupDetail;
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
