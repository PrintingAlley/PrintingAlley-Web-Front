import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

const INSTAGRAM_URL = 'https://www.instagram.com/printing_street';
const GITHUB_URL = 'https://github.com/PrintingAlley';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Logo />

        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1 }}>
          <span>정다운 남매들</span>|<span>인쇄 골목</span>
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton href={INSTAGRAM_URL} target="_blank">
            <Iconify icon="akar-icons:instagram-fill" />
          </IconButton>
          <IconButton href={GITHUB_URL} target="_blank">
            <Iconify icon="akar-icons:github-fill" />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
