import { Button, Box, styled, Typography, Avatar } from '@mui/material';
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
  const { user, handleLoginRedirect, logout, withdraw, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Avatar src={user.profileImage} alt={user.name} sx={{ width: 100, height: 100 }} />
        <Typography>{user.name}님 환영합니다.</Typography>
        <Typography>{user.provider}로 로그인했습니다.</Typography>
        <Typography>{user.profileImage}</Typography>
        <Button onClick={logout} variant="soft" color="warning">
          로그아웃
        </Button>
        <Button onClick={withdraw} variant="soft" color="error">
          회원탈퇴
        </Button>
      </Box>
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
