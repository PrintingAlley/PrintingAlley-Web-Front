import { Button, Box, Typography, Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout, withdraw, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <Stack spacing={2} my={8}>
      <Avatar src={user.profileImage || ''} alt={user.name} sx={{ width: 100, height: 100 }} />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {user.name}님 환영합니다. 👋
      </Typography>
      <Box>
        <Button onClick={logout} variant="soft" color="warning">
          로그아웃
        </Button>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={withdraw} variant="soft" color="error">
          회원탈퇴
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          회원탈퇴 시, 모든 정보가 삭제되며{'\n'}복구할 수 없습니다.
        </Typography>
      </Stack>
      <Typography variant="h6" sx={{ mt: 4 }}>
        어드민 메뉴
      </Typography>
      <Box>
        <Button onClick={() => navigate('/content/new')} variant="soft" color="info">
          콘텐츠 작성 페이지
        </Button>
      </Box>
      <Box>
        <Button onClick={() => navigate('/print-shop/new')} variant="soft" color="info">
          인쇄소 추가 페이지
        </Button>
      </Box>
    </Stack>
  );
}
