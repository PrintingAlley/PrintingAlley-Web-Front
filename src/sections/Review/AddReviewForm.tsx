import { Box, TextField, Button, Rating, ButtonGroup, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateReview } from 'src/types/review';
import axios from 'src/utils/axios';

const labels: { [index: string]: string } = {
  1: '별로에요',
  2: '그럭저럭',
  3: '괜찮아요',
  4: '좋아요',
  5: '최고에요',
};

export function AddReviewForm({
  type,
  targetId,
  onAdd,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  onAdd: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateReview>({ defaultValues: { rating: 5 } });
  const [hover, setHover] = useState(-1);

  const rating = watch('rating');

  const handleFormSubmit = async (data: CreateReview) => {
    axios
      .post<CreateReview>(`/${type}/${targetId}/review`, data)
      .then((response: any) => {
        enqueueSnackbar('리뷰가 성공적으로 추가되었습니다.', { variant: 'success' });
        reset();
        onAdd();
      })
      .catch((error) => {
        enqueueSnackbar(`리뷰 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>{labels[hover !== -1 ? hover : rating]}</Typography>
        <Rating
          size="large"
          name="rating"
          value={rating}
          defaultValue={5}
          onChange={(event, newValue) => {
            setValue('rating', newValue ?? 5);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </Box>

      <TextField
        {...register('content', {
          required: '내용을 작성해주세요.',
          minLength: {
            value: 2,
            message: '내용은 2글자 이상이어야 합니다.',
          },
          maxLength: {
            value: 1000,
            message: '내용은 1000글자 이하여야 합니다.',
          },
        })}
        placeholder="리뷰를 작성해주세요."
        error={Boolean(errors.content)}
        helperText={errors.content?.message}
        fullWidth
        multiline
        rows={4}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonGroup color="inherit">
          <Button type="submit" variant="outlined">
            등록
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
