import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { ContentInterface } from 'src/types/response.dto';
import { UpdateContentForm } from './UpdateContentForm';

interface UpdateContentDialogProps {
  content: ContentInterface;
  onAdd: () => void;
}

export const UpdateContentDialog = ({ content, onAdd }: UpdateContentDialogProps) => {
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
        콘텐츠 수정
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4">콘텐츠 수정</DialogTitle>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <DialogContent>
          <UpdateContentForm content={content} onAddSuccess={handleAddSuccess} />
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
