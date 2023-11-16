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
import useAuth, { getProviderName } from 'src/hooks/useAuth';
import { Provider } from 'src/types/response.dto';
import PolicyLink from '../common/PolicyLink';

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
    provider: Provider.Naver,
    icon: '/icons/naver-logo.svg',
  },
  {
    provider: Provider.Kakao,
    icon: '/icons/kakao-logo.svg',
  },
  {
    provider: Provider.Google,
    icon: '/icons/google-logo.svg',
  },
  {
    provider: Provider.Apple,
    icon: '/icons/apple-logo.svg',
  },
];

interface Props {
  variant?: 'contained' | 'outlined' | 'text' | 'soft';
  text?: string;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';
  startIcon?: React.ReactNode;
  iconButton?: boolean;
  bookmarkIcon?: boolean;
}

export default function LoginModal({
  variant = 'text',
  text = '로그인',
  color = 'inherit',
  startIcon,
  iconButton = false,
  bookmarkIcon = false,
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
          {iconButton ? (
            <>
              {bookmarkIcon ? (
                <Tooltip title="로그인하여 북마크에 추가하기">
                  <IconButton color="primary" onClick={handleOpen}>
                    <Iconify icon="mdi:bookmark-outline" />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="로그인">
                  <IconButton onClick={handleOpen} sx={{ width: 40, height: 40 }} color="inherit">
                    <Iconify icon="ic:round-login" />
                  </IconButton>
                </Tooltip>
              )}
            </>
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
                {loginProviders.map((item) => (
                  <LoginButton
                    key={item.provider}
                    startIcon={<Box component="img" src={item.icon} alt={item.provider} />}
                    onClick={() => handleLoginRedirect(item.provider)}
                  >
                    <Typography sx={{ width: 192 }}>
                      {getProviderName(item.provider)} 로그인
                    </Typography>
                  </LoginButton>
                ))}
                <PolicyLink />
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
