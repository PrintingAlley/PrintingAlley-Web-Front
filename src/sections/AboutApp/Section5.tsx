import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';

export default function Section5() {
  const theme = useTheme();

  const lightMode = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    lightMode ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      component={MotionViewport}
      sx={{ height: 720, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid container spacing={5}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            component={m.div}
            variants={varFade().inUp}
          >
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
              어렵고 낯선 인쇄용어
            </Typography>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              이해하기
            </Typography>
            <Typography
              variant="subtitle1"
              color="grey.500"
              textAlign="center"
              sx={{ whiteSpace: 'pre-line' }}
            >
              복잡하고 낯선 인쇄용어와 과정을{'\n'}쉽게 이해해보세요
            </Typography>
          </Stack>
          <Stack>
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                src="/assets/about-app/section5-1-iphone.png"
                sx={{ borderRadius: 3, boxShadow: shadow }}
              />
            </m.div>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <m.div variants={varFade().inUp}>
            <Box
              component="img"
              src="/assets/about-app/section5-2-iphone.png"
              sx={{ borderRadius: 3, boxShadow: shadow }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
