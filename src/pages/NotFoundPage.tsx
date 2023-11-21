import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/path';
import PageContainer from 'src/sections/common/PageContainer';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate(paths.root);
  };

  return (
    <PageContainer>
      <Stack spacing={3} mt={8}>
        <Typography variant="h2">404 Not Found</Typography>
        <Typography>요청하신 페이지를 찾을 수 없습니다.</Typography>
        <Stack direction="row" spacing={2}>
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
    </PageContainer>
  );
}
