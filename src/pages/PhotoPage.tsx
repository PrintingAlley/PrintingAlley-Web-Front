import { Container, Dialog, IconButton, Stack, alpha } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { paths } from 'src/routes/path';

export default function PhotoPage() {
  const imageUrl = new URLSearchParams(window.location.search).get('url');
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate(paths.root);
  };

  const copyImageUrlToClipboard = async () => {
    if (imageUrl) {
      await navigator.clipboard.writeText(imageUrl);
      alert('이미지 URL이 클립보드에 복사되었습니다.');
    }
  };

  return (
    <Dialog open fullScreen>
      <Container
        maxWidth="sm"
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imageUrl && <Image src={imageUrl} width={1} />}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <IconButton
            onClick={navigateToHome}
            sx={{
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Iconify icon="ant-design:home-filled" color="primary.main" />
          </IconButton>
          <IconButton
            onClick={copyImageUrlToClipboard}
            sx={{
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08),
              },
            }}
          >
            <Iconify icon="ant-design:copy-filled" color="warning.main" />
          </IconButton>
        </Stack>
      </Container>
    </Dialog>
  );
}
