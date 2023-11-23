import { Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';
import Image from 'src/components/image';

export default function Section2() {
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
      <Grid container direction="row-reverse" spacing={5}>
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
            <Image
              src="/assets/about-app/section2-iphone.png"
              sx={{ borderRadius: 3, boxShadow: shadow }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
