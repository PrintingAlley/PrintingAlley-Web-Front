import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import {
  GetProductResponse,
  GetProductReviewsResponse,
  ProductDetail,
  ProductReviewWithUser,
} from 'src/types/response.dto';
import { increaseProductViewCount } from 'src/apis/view-count';
import { useNavigate } from 'react-router';

const useProductData = (productId: string | undefined) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<ProductReviewWithUser[] | null>(null);

  const fetchProduct = async () =>
    axios
      .get<GetProductResponse>(`/product/${productId}`)
      .then((res) => {
        setProduct(res.data.product);
        fetchReviews();
        increaseViewCount();
        return res;
      })
      .catch((err) => {
        navigate('/404');
        return err;
      });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return { product, reviews, fetchProduct };
};

export default useProductData;
