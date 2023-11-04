import { Button, Box, Typography, Avatar } from '@mui/material';
import useAuth from 'src/hooks/useAuth';

export default function MyPage() {
  const { user, logout, withdraw, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Avatar src={user.profileImage || ''} alt={user.name} sx={{ width: 100, height: 100 }} />
      <Typography>{user.name}님 환영합니다.</Typography>
      <Typography>{user.provider}로 로그인했습니다.</Typography>
      <Typography>{user.profileImage}</Typography>
      <Button onClick={logout} variant="soft" color="warning">
        로그아웃
      </Button>
      <Button onClick={withdraw} variant="soft" color="error">
        회원탈퇴
      </Button>
      <Button
        onClick={() => navigator.clipboard.writeText(`Bearer ${localStorage.getItem('token')}`)}
      >
        copy token
      </Button>
    </Box>
  );
}
