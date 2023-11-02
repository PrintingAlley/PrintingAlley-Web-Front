import {
  Avatar,
  Box,
  ButtonGroup,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'src/utils/axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { useTopLevelTags } from 'src/hooks/useTopLevelTags';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import {
  GetProductResponse,
  GetProductReviewsResponse,
  ProductDetail,
  ProductReviewWithUser,
} from 'src/types/response.dto';
import ProductDetailsCarousel from 'src/sections/Product/ProductDetailsCarousel';
import useAuth from 'src/hooks/useAuth';
import Iconify from 'src/components/iconify';
import { NavLink } from 'react-router-dom';
import { DeleteProductButton } from 'src/sections/Product/DeleteProductButton';
import { UpdateProductDialog } from 'src/sections/Product/UpdateProductDialog';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { topLevelTags, tagHierarchies } = useTopLevelTags();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<ProductReviewWithUser[]>([]);

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
    navigate('/product', { replace: true });
  };

  const goBack = () => {
    navigate(-1);
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
          <IconButton onClick={goBack}>
            <Iconify icon="ic:round-arrow-back" />
          </IconButton>

          <CenteredTitle title={product.name} />

          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Avatar
                alt="Logo"
                src={product.mainImage}
                sx={{ width: 120, height: 'auto' }}
                variant="rounded"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" color="textSecondary">
                {product.category.name}
              </Typography>
              <Typography>{product.printShop.name}</Typography>
              <Typography>{product.printShop.email}</Typography>
              <Typography fontWeight="medium">{product.introduction}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ textAlign: 'center' }}>
                {product.description}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ height: 32 }} />

          <Box>
            <ProductDetailsCarousel product={product} />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              제작 인쇄사
            </Typography>
            <Typography>{product.printShop.name}</Typography>
            <Typography>{product.printShop.email}</Typography>
            <Link component={NavLink} color="primary" to={`/print-shop/${product.printShop.id}`}>
              인쇄사 페이지로 이동
            </Link>
          </Box>

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

          <Box>
            <Typography variant="h6" gutterBottom>
              리뷰
            </Typography>
            <List>
              {reviews?.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Logo" src={review.user?.profileImage || ''} />
                    </ListItemAvatar>
                    <ListItemText primary={review.user?.name} secondary={review.content} />
                    {user?.id === review.user?.id && (
                      <ListItemSecondaryAction>
                        <IconButton>
                          <Iconify icon="ic:round-edit" />
                        </IconButton>
                        <IconButton>
                          <Iconify icon="ic:round-delete" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>

          <Box sx={{ height: 64 }} />

          <ButtonGroup color="inherit">
            <UpdateProductDialog
              product={product}
              topLevelTags={topLevelTags}
              tagHierarchies={tagHierarchies}
              onAdd={onAdd}
            />
            <DeleteProductButton product={product} onDelete={onDelete} />
          </ButtonGroup>
        </div>
      ) : (
        <SkeletonSection />
      )}
    </>
  );
}
