/* eslint-disable import/no-duplicates */
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
import { ProductReviewWithUser, UserInterface } from 'src/types/response.dto';
import { formatDistanceToNow } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { AddReviewForm } from './AddReviewForm';
import DeleteReviewButton from './DeleteReviewButton';

function ReviewItem({
  type,
  targetId,
  review,
  currentUser,
  fetchReviews,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  review: ProductReviewWithUser;
  currentUser?: UserInterface;
  fetchReviews: () => void;
}) {
  const isCurrentUserReview = currentUser?.id === review.user.id;
  const createdAt = new Date(review.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: ko });

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
              <Typography color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
                {review.content}
              </Typography>
              {review.images && (
                <Box sx={{ mt: 1, display: 'flex', gap: 1, overflowX: 'auto' }}>
                  {review.images.map((img, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={img}
                      alt="Review Image"
                      sx={{ width: 100, borderRadius: 1 }}
                    />
                  ))}
                </Box>
              )}
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
  currentUser,
  fetchReviews,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  reviews: ProductReviewWithUser[];
  currentUser?: UserInterface;
  fetchReviews: () => void;
}) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        리뷰
      </Typography>
      <AddReviewForm type={type} targetId={targetId} onAdd={fetchReviews} />
      <List>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            type={type}
            targetId={targetId}
            review={review}
            currentUser={currentUser}
            fetchReviews={fetchReviews}
          />
        ))}
      </List>
    </>
  );
}
