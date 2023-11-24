import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varBounce, varFade } from 'src/components/animate';

export default function Section4() {
  const theme = useTheme();

  const lightMode = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    lightMode ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      sx={{ height: 960, display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}
    >
      <Grid container direction="row-reverse" spacing={5} component={MotionViewport}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                src="/assets/about-app/section4-2-iphone.png"
                sx={{ borderRadius: 3, boxShadow: shadow }}
              />
            </m.div>
          </Stack>
          <MotionViewport>
            <Stack
              justifyContent="center"
              alignItems="center"
              component={m.div}
              variants={varFade().inUp}
            >
              <Box
                component={m.img}
                variants={varBounce().in}
                src="/assets/about-app/section4-check-icon.svg"
                width={40}
                mb={2.5}
              />

              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                인쇄사 정보 한 눈에
              </Typography>
              <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                확인하기
              </Typography>
              <Typography
                variant="subtitle1"
                color="grey.500"
                textAlign="center"
                sx={{ whiteSpace: 'pre-line' }}
              >
                작업할 때 꼭 알아야 하는{'\n'}인쇄사 정보만 골라서 확인하세요
              </Typography>
            </Stack>
          </MotionViewport>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <m.div variants={varFade().inUp}>
            <Box
              component="img"
              src="/assets/about-app/section4-1-iphone.png"
              sx={{ borderRadius: 3, boxShadow: shadow }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
