import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Logo from 'src/components/logo';
import { MotionViewport, varFade } from 'src/components/animate';
import AppStoreLinkButton from './AppStoreLinkButton';

const TEXT = '인쇄골목';

export default function Section6() {
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
              <Typography component={m.h5} variants={varFade().in} variant="h4" color="primary">
                인쇄 장인들의 작품을 한 곳에
              </Typography>
              <Typography
                component={m.h1}
                fontSize={64}
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
              <AppStoreLinkButton />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
