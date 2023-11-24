import { Box, Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varFlip } from 'src/components/animate';

export default function Section2() {
  const theme = useTheme();

  const lightMode = theme.palette.mode === 'light';

  const shadow = `-40px 40px 80px ${alpha(
    lightMode ? theme.palette.grey[500] : theme.palette.common.black,
    0.24
  )}`;

  return (
    <Container
      id="section2"
      sx={{
        minHeight: 720,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 10,
      }}
    >
      <Grid container direction="row-reverse" spacing={5} component={MotionViewport}>
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
          <Stack alignItems="center" component={m.div} variants={varFade().inRight}>
            <Box
              component={m.img}
              variants={varFlip().inY}
              src="/assets/about-app/section2-marker.png"
              width={48}
              mb={2.5}
            />
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
              내가 하고 싶은 바로 그 인쇄
            </Typography>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
              찾아보기
            </Typography>
            <Typography
              variant="subtitle1"
              color="grey.500"
              textAlign="center"
              sx={{ whiteSpace: 'pre-line' }}
            >
              필터를 통해 원하는 인쇄물을{'\n'}빠르고 정확하게 찾아보세요
            </Typography>
          </Stack>
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
              src="/assets/about-app/section2-iphone.png"
              sx={{ borderRadius: 3, boxShadow: shadow }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
