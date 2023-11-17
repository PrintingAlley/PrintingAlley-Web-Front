import { Box, Button, ButtonGroup, Chip, Divider, Typography } from '@mui/material';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import ProductDetailsCarousel from 'src/sections/Product/ProductDetailsCarousel';
import useAuth from 'src/hooks/useAuth';
import { DeleteProductButton } from 'src/sections/Product/DeleteProductButton';
import { UpdateProductDialog } from 'src/sections/Product/UpdateProductDialog';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { ReviewSection } from 'src/sections/Review/ReviewSection';
import Markdown from 'src/components/markdown';
import Iconify from 'src/components/iconify';
import { Helmet } from 'react-helmet-async';
import ProductInfo from 'src/sections/Product/ProductInfo';
import ProductActions from 'src/sections/Product/ProductActions';
import useProductData from 'src/hooks/useProductData';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const { product, reviews, fetchProduct } = useProductData(id);

  const scrollToReviewSection = () => {
    if (reviewSectionRef.current) {
      reviewSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
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
                fetchReviews={fetchProduct}
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
