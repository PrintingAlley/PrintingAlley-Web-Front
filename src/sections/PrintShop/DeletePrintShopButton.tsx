import { Button } from '@mui/material';
import { PrintShop } from 'src/types/print-shop';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';

interface DeletePrintShopButtonProps {
  printShop: PrintShop;
  onDelete: () => void;
}

export const DeletePrintShopButton = ({ printShop, onDelete }: DeletePrintShopButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const deletePrintShop = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    axios
      .delete(`print-shop/${printShop.id}`)
      .then(() => {
        enqueueSnackbar('인쇄소가 성공적으로 삭제되었습니다.', { variant: 'success' });
        onDelete();
      })
      .catch((error) => {
        enqueueSnackbar(`인쇄소 삭제 중 오류가 발생했습니다. ${error.message}`, {
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
      인쇄소 삭재
    </Button>
  );
};
