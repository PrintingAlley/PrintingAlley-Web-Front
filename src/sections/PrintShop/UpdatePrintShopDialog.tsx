import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { PrintShopDetail } from 'src/types/response.dto';
import { UpdatePrintShopForm } from './UpdatePrintShopForm';

interface UpdatePrintShopDialogProps {
  printShop: PrintShopDetail;
  onAdd: () => void;
}

export const UpdatePrintShopDialog = ({ printShop, onAdd }: UpdatePrintShopDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSuccess = () => {
    handleClose();
    onAdd();
  };

  return (
    <>
      <Button onClick={handleOpen} startIcon={<Iconify icon="ic:baseline-edit" />} variant="soft">
        인쇄사 수정
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4">인쇄사 수정</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          <UpdatePrintShopForm printShop={printShop} onAddSuccess={handleAddSuccess} />
        </DialogContent>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
