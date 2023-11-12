import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Rating,
  ListItemSecondaryAction,
  Divider,
  Stack,
  Link,
} from '@mui/material';
import React from 'react';
import {
  PrintShopInterface,
  PrintShopReviewWithPrintShop,
  ProductInterface,
  ProductReviewWithProduct,
} from 'src/types/response.dto';
import { fToNow } from 'src/utils/format-time';
import { useNavigate } from 'react-router';
import DeleteReviewButton from '../Review/DeleteReviewButton';
import ReviewImageLightbox from '../Review/ReviewImageLightbox';

function ReviewItem({
  type,
  target,
  review,
  fetchReviews,
}: {
  type: 'product' | 'print-shop';
  target: PrintShopInterface | ProductInterface;
  review: PrintShopReviewWithPrintShop | ProductReviewWithProduct;
  fetchReviews: () => void;
}) {
  const navigate = useNavigate();
  const navigateToTarget = () => {
    navigate(`/${type}/${target.id}`);
  };
  const createdAt = new Date(review.createdAt);
  const timeAgo = fToNow(createdAt);

  return (
    <React.Fragment key={review.id}>
      <ListItem sx={{ alignItems: 'flex-start', display: 'flex' }}>
        <ListItemAvatar>
          <Avatar
            alt="Logo"
            src={
              type === 'print-shop'
                ? (target as PrintShopInterface).logoImage
                : (target as ProductInterface).mainImage
            }
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Rating value={review.rating} readOnly size="small" />}
          secondary={
            <>
              <Typography variant="body2" gutterBottom>
                {timeAgo}
              </Typography>
              <Typography color="text.primary" sx={{ whiteSpace: 'pre-wrap' }} noWrap>
                {review.content}
              </Typography>
              {review.images && review.images.length ? (
                <Box sx={{ mt: 1, overflowX: 'auto' }}>
                  <ReviewImageLightbox images={review.images} />
                </Box>
              ) : null}
              <Link
                component="button"
                variant="body2"
                onClick={navigateToTarget}
                textAlign="left"
                sx={{ mt: 0.5 }}
              >
                {target.name} 페이지로 이동하기 →
              </Link>
            </>
          }
        />
        <ListItemSecondaryAction>
          <DeleteReviewButton
            type={type}
            targetId={target.id}
            reviewId={review.id}
            onAdd={fetchReviews}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

export function MyPrintShopReviewSection({
  reviews,
  fetchReviews,
}: {
  reviews: PrintShopReviewWithPrintShop[];
  fetchReviews: () => void;
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mx: 1 }}>
        인쇄사 리뷰
      </Typography>
      {reviews.length ? (
        <List>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              type="print-shop"
              target={review.printShop}
              review={review}
              fetchReviews={fetchReviews}
            />
          ))}
        </List>
      ) : (
        <Stack justifyContent="center" alignItems="center" height={160}>
          <Typography color="text.secondary">인쇄사 리뷰를 작성해보세요!</Typography>
        </Stack>
      )}
    </>
  );
}

export function MyProductReviewSection({
  reviews,
  fetchReviews,
}: {
  reviews: ProductReviewWithProduct[];
  fetchReviews: () => void;
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mx: 1 }}>
        상품 리뷰
      </Typography>
      {reviews.length ? (
        <List>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              type="product"
              target={review.product}
              review={review}
              fetchReviews={fetchReviews}
            />
          ))}
        </List>
      ) : (
        <Stack justifyContent="center" alignItems="center" height={160}>
          <Typography color="text.secondary">상품 리뷰를 작성해보세요!</Typography>
        </Stack>
      )}
    </>
  );
}
