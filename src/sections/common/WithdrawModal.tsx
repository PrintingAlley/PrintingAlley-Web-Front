import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import useAuth from 'src/hooks/useAuth';

export default function WithdrawModal() {
  const { withdraw } = useAuth();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link
        onClick={handleOpen}
        color="text.secondary"
        variant="caption"
        sx={{ cursor: 'pointer' }}
      >
        회원탈퇴
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>회원탈퇴</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="error">회원탈퇴 시, 모든 정보가 삭제되며 복구할 수 없습니다.</Alert>
          <Stack direction="row" spacing={1} alignItems="center">
            <Checkbox
              title="회원탈퇴"
              color="error"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <Typography variant="caption" color="text.secondary">
              이 내용을 확인하였으며, 회원탈퇴에 동의합니다.
            </Typography>
          </Stack>
          <Button
            onClick={withdraw}
            variant="soft"
            color="error"
            disabled={!checked}
            startIcon={<Iconify icon="ic:round-delete" />}
            sx={{ alignSelf: 'flex-end' }}
          >
            회원탈퇴
          </Button>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
