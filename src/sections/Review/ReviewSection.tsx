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
} from '@mui/material';
import React from 'react';
import {
  PrintShopReviewWithUser,
  ProductReviewWithUser,
  UserInterface,
} from 'src/types/response.dto';
import { fToNow } from 'src/utils/format-time';
import useAuth from 'src/hooks/useAuth';
import { AddReviewForm } from './AddReviewForm';
import DeleteReviewButton from './DeleteReviewButton';
import LoginModal from '../Login/LoginModal';
import ReviewImageLightbox from './ReviewImageLightbox';

function ReviewItem({
  type,
  targetId,
  review,
  currentUser,
  fetchReviews,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  review: PrintShopReviewWithUser | ProductReviewWithUser;
  currentUser?: UserInterface;
  fetchReviews: () => void;
}) {
  const isCurrentUserReview = currentUser?.id === review.user.id;
  const createdAt = new Date(review.createdAt);
  const timeAgo = fToNow(createdAt);

  return (
    <React.Fragment key={review.id}>
      <ListItem sx={{ alignItems: 'flex-start', display: 'flex' }}>
        <ListItemAvatar>
          <Avatar alt="Logo" src={review.user.profileImage || ''} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>{review.user.name}</Typography>
              <Rating value={review.rating} readOnly size="small" />
            </Box>
          }
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
            </>
          }
        />
        {isCurrentUserReview && (
          <ListItemSecondaryAction>
            <DeleteReviewButton
              type={type}
              targetId={targetId}
              reviewId={review.id}
              onAdd={fetchReviews}
            />
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

export function ReviewSection({
  type,
  targetId,
  reviews,
  fetchReviews,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  reviews: PrintShopReviewWithUser[] | ProductReviewWithUser[];
  fetchReviews: () => void;
}) {
  const { user, isAuthenticated } = useAuth();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        리뷰
      </Typography>
      {isAuthenticated ? (
        <AddReviewForm type={type} targetId={targetId} onAdd={fetchReviews} />
      ) : (
        <Box mb={1}>
          <Typography variant="body2" gutterBottom>
            로그인 후 리뷰를 작성할 수 있습니다.
          </Typography>
          <LoginModal variant="outlined" text="로그인하기" />
        </Box>
      )}
      {reviews.length ? (
        <List>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              type={type}
              targetId={targetId}
              review={review}
              currentUser={user}
              fetchReviews={fetchReviews}
            />
          ))}
        </List>
      ) : (
        <Typography color="text.secondary" sx={{ textAlign: 'center', my: 8 }}>
          첫 번째 리뷰를 작성해보세요!
        </Typography>
      )}
    </>
  );
}
