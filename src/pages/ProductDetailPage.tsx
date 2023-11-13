import {
  Avatar,
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { useTag } from 'src/hooks/useTag';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import {
  GetProductResponse,
  GetProductReviewsResponse,
  ProductDetail,
  ProductReviewWithUser,
} from 'src/types/response.dto';
import ProductDetailsCarousel from 'src/sections/Product/ProductDetailsCarousel';
import useAuth from 'src/hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { DeleteProductButton } from 'src/sections/Product/DeleteProductButton';
import { UpdateProductDialog } from 'src/sections/Product/UpdateProductDialog';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { ReviewSection } from 'src/sections/Review/ReviewSection';
import Markdown from 'src/components/markdown';
import BookmarkModal from 'src/sections/Product/BookmarkModal';
import LoginModal from 'src/sections/Login/LoginModal';
import Iconify from 'src/components/iconify';
import KakaoShareButton from 'src/sections/common/KakaoShareButton';
import { Helmet } from 'react-helmet-async';

function ProductInformation({ product }: { product: ProductDetail }) {
  return (
    <Grid container spacing={{ xs: 5, md: 3 }}>
      <Grid item xs={12} md={4}>
        <Avatar
          alt="Logo"
          src={product.mainImage}
          sx={{ width: 1, height: 'auto', maxWidth: { xs: 200, md: 1 }, mx: 'auto' }}
          variant="rounded"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Typography variant="subtitle1" color="textSecondary">
          {product.category.name}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>제작 인쇄사</b>{' '}
          <Tooltip title="인쇄사 페이지로 이동">
            <Link component={NavLink} to={`/print-shop/${product.printShop.id}`}>
              {product.printShop.name}
            </Link>
          </Tooltip>
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>디자인</b> {product.designer}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>제품 크기</b> {product.size}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>종이</b> {product.paper}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>인쇄 방식</b> {product.printType}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>
          <b>후가공</b> {product.afterProcess}
        </Typography>
        <Divider sx={{ my: 0.5 }} />
        <Typography>{product.introduction}</Typography>
      </Grid>
    </Grid>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { topLevelTags, tagHierarchies } = useTag();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<ProductReviewWithUser[] | null>(null);

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

  useEffect(() => {
    fetchProduct();
    fetchReviews();
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

          <KakaoShareButton productDetail={product} />

          <CenteredTitle title={product.name} sx={{ mt: 8, mb: 5 }} />

          <ProductInformation product={product} />

          <Box sx={{ height: 16 }} />

          <Stack alignItems="center" justifyContent="center">
            {isAuthenticated ? (
              <BookmarkModal product={product} fetchProduct={fetchProduct} />
            ) : (
              <LoginModal
                text="로그인하여 북마크에 추가하기"
                color="primary"
                startIcon={<Iconify icon="mdi:bookmark-outline" />}
              />
            )}
          </Stack>

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

          {reviews && (
            <ReviewSection
              type="product"
              targetId={product.id}
              reviews={reviews}
              fetchReviews={fetchReviews}
            />
          )}

          <Box sx={{ height: 64 }} />

          {user?.id === product.ownerId && (
            <ButtonGroup color="inherit">
              <UpdateProductDialog
                product={product}
                topLevelTags={topLevelTags}
                tagHierarchies={tagHierarchies}
                onAdd={onAdd}
              />
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
