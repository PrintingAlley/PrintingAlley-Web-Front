import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import useAuth from 'src/hooks/useAuth';

const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  img: {
    height: 24,
  },
  p: {
    fontWeight: 600,
  },
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

const loginProviders = [
  {
    name: 'naver',
    label: '네이버',
    icon: '/icons/naver-logo.svg',
  },
  {
    name: 'kakao',
    label: '카카오',
    icon: '/icons/kakao-logo.svg',
  },
  {
    name: 'google',
    label: '구글',
    icon: '/icons/google-logo.svg',
  },
  {
    name: 'apple',
    label: '애플',
    icon: '/icons/apple-logo.svg',
  },
];

interface Props {
  variant?: 'contained' | 'outlined' | 'text';
  text?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  startIcon?: React.ReactNode;
  isIconButton?: boolean;
}

export default function LoginModal({
  variant = 'text',
  text = '로그인',
  color = 'inherit',
  startIcon,
  isIconButton = false,
}: Props) {
  const { handleLoginRedirect, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          {isIconButton ? (
            <Tooltip title="로그인">
              <IconButton onClick={handleOpen} sx={{ width: 40, height: 40 }} color="inherit">
                <Iconify icon="ic:round-login" />
              </IconButton>
            </Tooltip>
          ) : (
            <Button variant={variant} color={color} startIcon={startIcon} onClick={handleOpen}>
              {text}
            </Button>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>소셜 계정으로 로그인 할 수 있습니다</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {loginProviders.map((provider) => (
                  <LoginButton
                    key={provider.name}
                    startIcon={<Box component="img" src={provider.icon} alt={provider.name} />}
                    onClick={() => handleLoginRedirect(provider.name)}
                  >
                    <Typography sx={{ width: 192 }}>{provider.label} 로그인</Typography>
                  </LoginButton>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}
