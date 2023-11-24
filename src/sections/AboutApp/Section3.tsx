import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';
import { useResponsive } from 'src/hooks/useResponsive';

export default function Section3() {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const lightMode = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    lightMode ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      sx={{ height: 960, display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}
    >
      <Grid container spacing={8} component={MotionViewport}>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack alignItems="center" component={m.div} variants={varFade().inUp}>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
              종이부터 후가공까지
            </Typography>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              살펴보기
            </Typography>
            <Typography
              variant="subtitle1"
              color="grey.500"
              textAlign="center"
              sx={{ whiteSpace: 'pre-line' }}
            >
              인쇄물에 대한 상세한 정보를{'\n'}한눈에 확인하세요
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          {smUp ? (
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                src="/assets/about-app/section3-iphone.png"
                sx={{ borderRadius: 3, boxShadow: shadow }}
              />
            </m.div>
          ) : (
            <m.div variants={varFade().inUp}>
              <Box
                component="img"
                src="/assets/about-app/section3-iphone-mobile.png"
                sx={{ borderRadius: 3, boxShadow: shadow }}
              />
            </m.div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
