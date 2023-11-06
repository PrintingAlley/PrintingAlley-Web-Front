import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { ProductDetail, TagInterface } from 'src/types/response.dto';
import { UpdateProductForm } from './UpdateProductForm';

interface UpdateProductDialogProps {
  product: ProductDetail;
  topLevelTags: TagInterface[];
  tagHierarchies: Record<number, TagInterface[]>;
  onAdd: () => void;
}

export const UpdateProductDialog = ({
  product,
  topLevelTags,
  tagHierarchies,
  onAdd,
}: UpdateProductDialogProps) => {
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
        제품 수정
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4">상품 수정</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          <UpdateProductForm
            product={product}
            topLevelTags={topLevelTags}
            tagHierarchies={tagHierarchies}
            onAddSuccess={handleAddSuccess}
          />
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
