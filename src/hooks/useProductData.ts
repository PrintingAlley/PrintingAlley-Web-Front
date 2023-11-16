import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import {
  GetProductResponse,
  GetProductReviewsResponse,
  ProductDetail,
  ProductReviewWithUser,
} from 'src/types/response.dto';
import { increaseProductViewCount } from 'src/apis/view-count';

const useProductData = (productId: string | undefined) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<ProductReviewWithUser[] | null>(null);

  const fetchProduct = async () => {
    const response = await axios.get<GetProductResponse>(`/product/${productId}`);
    setProduct(response.data.product);
  };

  const fetchReviews = async () => {
    const response = await axios.get<GetProductReviewsResponse>(`/product/${productId}/review`);
    setReviews(response.data.productReviews);
  };

  const increaseViewCount = async () => {
    await increaseProductViewCount(Number(productId));
  };

  useEffect(() => {
    if (!productId) return;
    fetchProduct();
    fetchReviews();
    increaseViewCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return { product, reviews, fetchProduct, fetchReviews };
};

export default useProductData;
