import { Box, Button, ButtonGroup, Chip, Divider, Typography } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import {
  GetProductResponse,
  GetProductReviewsResponse,
  ProductDetail,
  ProductReviewWithUser,
} from 'src/types/response.dto';
import ProductDetailsCarousel from 'src/sections/Product/ProductDetailsCarousel';
import useAuth from 'src/hooks/useAuth';
import { DeleteProductButton } from 'src/sections/Product/DeleteProductButton';
import { UpdateProductDialog } from 'src/sections/Product/UpdateProductDialog';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { ReviewSection } from 'src/sections/Review/ReviewSection';
import Markdown from 'src/components/markdown';
import Iconify from 'src/components/iconify';
import { Helmet } from 'react-helmet-async';
import { increaseProductViewCount } from 'src/apis/view-count';
import ProductInfo from 'src/sections/Product/ProductInfo';
import ProductActions from 'src/sections/Product/ProductActions';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<ProductReviewWithUser[] | null>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const scrollToReviewSection = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchProduct = () => {
    axios.get<GetProductResponse>(`/product/${id}`).then((response) => {
      setProduct(response.data.product);
    });
  };

  const fetchReviews = () => {
    axios.get<GetProductReviewsResponse>(`/product/${id}/review`).then((response) => {
      setReviews(response.data.productReviews);
    });
  };

  const onAdd = () => {
    fetchProduct();
  };

  const onDelete = () => {
    navigate('/', { replace: true });
  };

  const navigateToAdminUpdateProductPage = () => {
    navigate(`/admin/product/${product?.printShop.id}/${id}`);
  };

  useEffect(() => {
    if (!id) return;
    fetchProduct();
    fetchReviews();
    increaseProductViewCount(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {product ? (
        <div>
          <Helmet>
            <title>{product.name} | 인쇄골목</title>
          </Helmet>

          <NavigateBackButton />

          <CenteredTitle title={product.name} sx={{ mt: 8, mb: { xs: 5, md: 3 } }} />

          <ProductInfo
            product={product}
            actions={
              <ProductActions
                product={product}
                reviews={reviews}
                isAuthenticated={isAuthenticated}
                onReviewScroll={scrollToReviewSection}
                fetchProduct={fetchProduct}
              />
            }
          />

          <Divider sx={{ my: 2 }} />

          <Markdown sx={{ py: 2 }}>{product.description}</Markdown>

          <Divider sx={{ my: 2 }} />

          {product.images.length ? (
            <ProductDetailsCarousel images={product.images} />
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', my: 5 }}>
              제품 이미지가 없습니다.
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              태그
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {product.tags?.map((tag) => <Chip key={tag.id} label={tag.name} />)}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box ref={reviewSectionRef}>
            {reviews && (
              <ReviewSection
                type="product"
                targetId={product.id}
                reviews={reviews}
                fetchReviews={fetchReviews}
              />
            )}
          </Box>

          <Box sx={{ height: 64 }} />

          {user?.id === product.ownerId && (
            <ButtonGroup color="inherit">
              {user.userType === 'ADMIN' ? (
                <Button
                  onClick={navigateToAdminUpdateProductPage}
                  startIcon={<Iconify icon="ic:baseline-edit" />}
                  variant="soft"
                >
                  제품 수정 (관리자)
                </Button>
              ) : (
                <UpdateProductDialog product={product} onAdd={onAdd} />
              )}
              <DeleteProductButton product={product} onDelete={onDelete} />
            </ButtonGroup>
          )}
        </div>
      ) : (
        <SkeletonSection />
      )}
    </>
  );
}
