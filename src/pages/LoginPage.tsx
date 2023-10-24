import { Button, Box, styled, Typography } from '@mui/material';
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

export default function LoginPage() {
  const { user, handleLoginRedirect, logout, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <>
        <Typography>Welcome, {user.name}</Typography>
        <Typography>{user.email}</Typography>
        <Typography>{user.provider}</Typography>
        <Typography>{user.profileImage}</Typography>
        <Button onClick={logout}>Logout</Button>
      </>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      gap={2}
    >
      {loginProviders.map((provider) => (
        <LoginButton
          key={provider.name}
          startIcon={<img src={provider.icon} alt={provider.name} />}
          sx={provider.styles}
          onClick={() => handleLoginRedirect(provider.name)}
        >
          <Typography sx={{ width: 160 }}>{provider.label} 로그인</Typography>
        </LoginButton>
      ))}
    </Box>
  );
}
