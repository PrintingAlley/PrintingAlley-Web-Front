import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goHome = () => {
    navigate('/');
  };

  return (
    <Stack spacing={3} mt={8}>
      <Typography variant="h2">404 Not Found</Typography>
      <Typography>요청하신 페이지를 찾을 수 없습니다.</Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="soft"
          onClick={goBack}
          startIcon={<Iconify icon="ic:round-arrow-back" />}
          color="primary"
        >
          뒤로가기
        </Button>
        <Button
          variant="contained"
          onClick={goHome}
          startIcon={<Iconify icon="ic:round-home" />}
          color="primary"
        >
          홈으로
        </Button>
      </Stack>
    </Stack>
  );
}
