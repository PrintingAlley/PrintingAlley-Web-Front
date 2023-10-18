import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Tag } from 'src/types/print-shop';
import Iconify from 'src/components/iconify/iconify';
import { CreatePrintShopForm } from './CreatePrintShopForm';

interface NewPrintShopDialogProps {
  topLevelTags: Tag[];
  tagHierarchies: Record<number, Tag[]>;
  onAdd: () => void;
}

export const NewPrintShopDialog = ({
  topLevelTags,
  tagHierarchies,
  onAdd,
}: NewPrintShopDialogProps) => {
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
      <Button onClick={handleOpen} startIcon={<Iconify icon="ic:baseline-add" />} variant="soft">
        인쇄소 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4">새로운 인쇄소 추가</DialogTitle>
        <DialogContent>
          <CreatePrintShopForm
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
