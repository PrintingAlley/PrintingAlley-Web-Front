import { Button } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { ProductDetail } from 'src/types/response.dto';

interface DeleteProductButtonProps {
  product: ProductDetail;
  onDelete: () => void;
}

export const DeleteProductButton = ({ product, onDelete }: DeleteProductButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const deleteProduct = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    axios
      .delete(`/product/${product.id}`)
      .then(() => {
        enqueueSnackbar('제품이 성공적으로 삭제되었습니다.', { variant: 'success' });
        onDelete();
      })
      .catch((error) => {
        enqueueSnackbar(`제품 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Button
      onClick={deleteProduct}
      startIcon={<Iconify icon="ic:baseline-delete" />}
      variant="soft"
    >
      제품 삭제
    </Button>
  );
};
