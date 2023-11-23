import { Box, ButtonBase, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Logo from 'src/components/logo';
import { MotionViewport, varBounce, varFade, varHover } from 'src/components/animate';
import { APPLE_APP_STORE_URL } from 'src/constants/commons';

const TEXT = '인쇄골목';

export default function Section6() {
  const onClickAppStore = () => {
    window.open(APPLE_APP_STORE_URL);
  };

  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(${theme.palette.background.default} 0%, ${theme.palette.background.neutral} 100%)`,
      }}
    >
      <Container
        component={MotionViewport}
        sx={{ height: 720, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Grid container rowSpacing={8}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <m.div variants={varFade().inUp}>
              <Logo
                sx={{
                  width: { xs: 200, md: 400 },
                  height: { xs: 200, md: 400 },
                  borderRadius: { xs: 4, md: 8 },
                }}
              />
            </m.div>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack sx={{ userSelect: 'none' }}>
              <Typography component={m.h5} variants={varFade().in} variant="h5" color="grey.500">
                어렵고 복잡한 인쇄, 이젠
              </Typography>
              <Typography
                component={m.h1}
                fontSize={72}
                fontWeight="bold"
                fontFamily="Godo, sans-serif"
                sx={{ mb: { xs: 5, md: 10 } }}
              >
                {TEXT.split('').map((letter, index) => (
                  <m.span key={index} variants={varFade().inUp}>
                    {letter}
                  </m.span>
                ))}
              </Typography>
              <m.div variants={varBounce().inUp}>
                <ButtonBase
                  onClick={onClickAppStore}
                  component={m.button}
                  whileTap="tap"
                  whileHover="hover"
                  variants={varHover()}
                >
                  <Box
                    component="img"
                    src="/assets/about-app/download-black.svg"
                    sx={{ height: 64 }}
                  />
                </ButtonBase>
              </m.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
