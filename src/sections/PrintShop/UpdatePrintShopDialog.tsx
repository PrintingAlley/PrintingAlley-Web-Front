import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { PrintShop, Tag } from 'src/types/print-shop';
import Iconify from 'src/components/iconify/iconify';
import { UpdatePrintShopForm } from './UpdatePrintShopForm';

interface UpdatePrintShopDialogProps {
  printShop: PrintShop;
  topLevelTags: Tag[];
  tagHierarchies: Record<number, Tag[]>;
  onAdd: () => void;
}

export const UpdatePrintShopDialog = ({
  printShop,
  topLevelTags,
  tagHierarchies,
  onAdd,
}: UpdatePrintShopDialogProps) => {
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
        <DialogContent>
          <UpdatePrintShopForm
            printShop={printShop}
            topLevelTags={topLevelTags}
            tagHierarchies={tagHierarchies}
            onAddSuccess={handleAddSuccess}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
