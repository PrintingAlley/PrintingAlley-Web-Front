import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
  styled,
} from '@mui/material';
import { useState } from 'react';
import useAuth from 'src/hooks/useAuth';

const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  img: {
    height: '24px',
  },
  p: {
    fontWeight: 'bold',
  },
}));

const loginProviders = [
  {
    name: 'naver',
    label: '네이버',
    icon: '/icons/naver-logo-white.png',
    styles: { backgroundColor: '#03C75A !important', color: '#FFFFFF' },
  },
  {
    name: 'kakao',
    label: '카카오',
    icon: '/icons/kakao-logo.png',
    styles: { backgroundColor: '#FEE500 !important', color: '#191919' },
  },
  {
    name: 'google',
    label: '구글',
    icon: '/icons/google-logo.png',
    styles: {
      backgroundColor: '#FFFFFF !important',
      color: '#000000',
      border: '1px solid',
      borderColor: 'divider',
    },
  },
  {
    name: 'apple',
    label: '애플',
    icon: '/icons/apple-logo.png',
    styles: {
      backgroundColor: '#FFFFFF !important',
      color: '#000000',
      border: '1px solid',
      borderColor: 'divider',
    },
  },
];

interface Props {
  variant?: 'contained' | 'outlined' | 'text';
  text?: string;
  isMenuItem?: boolean;
  onClick?: () => void;
}

export default function LoginModal({
  variant = 'text',
  text = '로그인',
  isMenuItem = false,
  onClick,
}: Props) {
  const { handleLoginRedirect, isAuthenticated, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickMenuItem = () => {
    handleOpen();
    onClick?.();
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          {isMenuItem ? (
            <MenuItem onClick={onClickMenuItem}>{text}</MenuItem>
          ) : (
            <Button variant={variant} onClick={handleOpen}>
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
                    sx={provider.styles}
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
