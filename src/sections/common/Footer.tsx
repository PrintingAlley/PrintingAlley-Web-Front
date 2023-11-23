import { Box, Container, Grid, IconButton, Link, Stack, Typography, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/path';
import {
  INSTAGRAM_URL,
  GITHUB_URL,
  SERVICE_URL,
  PRIVACY_URL,
  COPYRIGHT_URL,
  APPLE_APP_STORE_URL,
  SUPPORT_EMAIL,
} from 'src/constants/commons';

export const _socials = [
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: INSTAGRAM_URL,
  },
  {
    value: 'github',
    name: 'Github',
    icon: 'ant-design:github-filled',
    color: '#000000',
    path: GITHUB_URL,
  },
  {
    value: 'app-store',
    name: 'App Store',
    icon: 'ant-design:apple-filled',
    color: '#000000',
    path: APPLE_APP_STORE_URL,
  },
];

const LINKS = [
  {
    headline: '인쇄골목',
    children: [
      { name: '작품 찾기', href: paths.product.root },
      { name: '인쇄사 찾기', href: paths.printShop.root },
      { name: '콘텐츠', href: paths.content.root },
    ],
  },
  {
    headline: '정책 및 법률',
    children: [
      { name: '이용약관', href: SERVICE_URL },
      { name: '개인정보처리방침', href: PRIVACY_URL },
      { name: '저작권보호방침', href: COPYRIGHT_URL },
    ],
  },
  {
    headline: '문의하기',
    children: [{ name: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` }],
  },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 3 }} />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid item xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
                whiteSpace: 'pre-line',
              }}
            >
              인쇄로 가는 지름길, 인쇄골목{'\n\n'}
              복잡한 인쇄정보, 이제 이미지로 검색해보세요!{'\n\n'}내가 상상한 작품과 비슷한 이미지를
              고르면 종이 종류, 인쇄방식, 후가공 등 자세한 인쇄정보를 확인할 수 있어요.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 3,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(social.color, 0.08),
                    },
                  }}
                >
                  <Iconify color={social.color} icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                  sx={{ width: 1 }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => {
                    const isHttp = link.href.includes('http');

                    return isHttp ? (
                      <Link
                        key={link.name}
                        color="inherit"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="body2"
                        {...link}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <Link
                        key={link.name}
                        color="inherit"
                        component={RouterLink}
                        to={link.href}
                        variant="body2"
                        {...link}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © 2023. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
