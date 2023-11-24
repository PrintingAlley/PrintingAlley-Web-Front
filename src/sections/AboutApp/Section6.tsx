import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Logo from 'src/components/logo';
import { MotionViewport, varFade } from 'src/components/animate';
import AppStoreLinkButton from './AppStoreLinkButton';
import { TitleAnimate } from './TitleAnimate';

export default function Section6() {
  return (
    <Box
      sx={{
        background: (theme) =>
          `linear-gradient(${theme.palette.background.default} 0%, ${theme.palette.background.neutral} 100%)`,
      }}
    >
      <Container
        sx={{
          minHeight: 720,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 10,
        }}
      >
        <Grid container rowSpacing={8} component={MotionViewport}>
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Stack sx={{ userSelect: 'none' }}>
              <Typography
                component={m.h4}
                variant="h4"
                color="primary"
                variants={varFade().inUp}
                gutterBottom
              >
                인쇄 장인들의 작품을 한 곳에
              </Typography>
              <TitleAnimate text="인쇄골목" fontSize={64} sx={{ mb: { xs: 5, md: 10 } }} />
              <AppStoreLinkButton />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
