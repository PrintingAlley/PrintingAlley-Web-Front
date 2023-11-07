import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  FormLabel,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Paper,
  PaperProps,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { useForm } from 'react-hook-form';
import Iconify from 'src/components/iconify';
import { BookmarkGroupDetail, BookmarkGroupWithHasProduct } from 'src/types/response.dto';
import axios from 'src/utils/axios';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

interface UpdateBookmarkDialogProps {
  bookmarkGroup: BookmarkGroupDetail | BookmarkGroupWithHasProduct;
  onUpdate: () => void;
}

export default function UpdateBookmarkDialog({
  bookmarkGroup,
  onUpdate,
}: UpdateBookmarkDialogProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ name: string }>({ defaultValues: { name: bookmarkGroup.name } });

  const onSubmit = (data: { name: string }) => {
    axios
      .put(`/bookmark/group/${bookmarkGroup.id}`, data)
      .then(() => {
        enqueueSnackbar('그룹이 성공적으로 수정되었습니다.', { variant: 'success' });
        onUpdate();
        reset();
        closeDialog();
      })
      .catch((error) => {
        if (error.message === '이미 같은 이름의 그룹이 있습니다.') {
          setError('name', { type: 'manual', message: error.message });
          setFocus('name');
        }
        enqueueSnackbar(`그룹 수정 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    reset({ name: bookmarkGroup.name });
  }, [bookmarkGroup, reset]);

  useEffect(() => {
    if (open) {
      setTimeout(() => setFocus('name'), 100);
    }
  }, [open, setFocus]);

  return (
    <>
      <IconButton onClick={openDialog} size="small">
        <Iconify icon="mdi:pencil" />
      </IconButton>
      <Dialog
        open={open}
        onClose={closeDialog}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle sx={{ cursor: 'move' }} id="draggable-dialog-title">
          북마크 그룹 수정
        </DialogTitle>
        <DialogContent sx={{ width: 360, maxWidth: 1 }}>
          <Stack spacing={2}>
            <FormLabel>그룹 이름</FormLabel>
            <TextField
              {...register('name', {
                required: '그룹 이름을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '그룹 이름은 2글자 이상이어야 합니다.',
                },
              })}
              fullWidth
              placeholder="그룹 이름을 입력하세요"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="soft">
            취소
          </Button>
          <LoadingButton loading={isSubmitting} type="submit" color="primary" variant="contained">
            수정
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
