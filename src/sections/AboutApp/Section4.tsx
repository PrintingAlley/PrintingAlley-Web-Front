import { Container, Grid, Stack, Typography, alpha, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';
import Image from 'src/components/image';

export default function Section4() {
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
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Stack sx={{ display: { xs: 'none', sm: 'block' } }}>
            <m.div variants={varFade().inUp}>
              <Image
                src="/assets/about-app/section4-2-iphone.png"
                sx={{ borderRadius: 3, boxShadow: shadow }}
              />
            </m.div>
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            component={m.div}
            variants={varFade().inUp}
          >
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
              src="/assets/about-app/section4-1-iphone.png"
              sx={{ borderRadius: 3, boxShadow: shadow }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
