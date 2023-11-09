import { IconButton, Tooltip } from '@mui/material';
import Iconify from 'src/components/iconify';
import axiosInstance from 'src/utils/axios';
import { CreateReview } from 'src/types/review';
import { useSnackbar } from 'notistack';

interface DeleteReviewButtonProps {
  type: 'product' | 'print-shop';
  targetId: number;
  reviewId: number;
  onAdd: () => void;
}

function DeleteReviewButton({ reviewId, onAdd, type, targetId }: DeleteReviewButtonProps) {
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = () => {
    if (!window.confirm('정말로 리뷰를 삭제하시겠습니까?')) return;
    axiosInstance
      .delete<CreateReview>(`/${type}/${targetId}/review/${reviewId}`)
      .then((response: any) => {
        enqueueSnackbar('리뷰가 성공적으로 삭제되었습니다.', { variant: 'success' });
        onAdd();
      })
      .catch((error) => {
        enqueueSnackbar(`리뷰 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };
  return (
    <Tooltip title="리뷰 삭제">
      <IconButton onClick={handleDelete}>
        <Iconify icon="ic:round-delete" />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteReviewButton;
