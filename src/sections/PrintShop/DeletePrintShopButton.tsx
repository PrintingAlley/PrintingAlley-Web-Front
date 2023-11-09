import { Button } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { PrintShopDetail } from 'src/types/response.dto';

interface DeletePrintShopButtonProps {
  printShop: PrintShopDetail;
  onDelete: () => void;
}

export const DeletePrintShopButton = ({ printShop, onDelete }: DeletePrintShopButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const deletePrintShop = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?\n삭제된 인쇄사는 복구할 수 없습니다.')) return;
    axios
      .delete(`/print-shop/${printShop.id}`)
      .then(() => {
        enqueueSnackbar('인쇄사가 성공적으로 삭제되었습니다.', { variant: 'success' });
        onDelete();
      })
      .catch((error) => {
        enqueueSnackbar(`인쇄사 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Button
      onClick={deletePrintShop}
      startIcon={<Iconify icon="ic:baseline-delete" />}
      variant="soft"
    >
      인쇄사 삭제
    </Button>
  );
};
