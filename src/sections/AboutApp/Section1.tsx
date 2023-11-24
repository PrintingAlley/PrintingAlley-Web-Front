import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varFlip, varHover, varScale } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import AppStoreLinkButton from './AppStoreLinkButton';

export default function Section1() {
  const goDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage:
          'url(/assets/about-app/section1-overlay.svg), url(/assets/about-app/section1-background.png)',
      }}
    >
      <Container
        component={MotionViewport}
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack alignItems="center" sx={{ zIndex: 1, userSelect: 'none' }}>
          <Box
            component={m.img}
            variants={varFlip().inY}
            src="/assets/about-app/section1-marker.svg"
            width={80}
            sx={{ position: 'absolute', top: 'calc(50% - 264px)' }}
          />
          <Typography component={m.h4} variants={varFade().in} variant="h4" color="primary.lighter">
            인쇄로 가는 지름길
          </Typography>
          <Typography
            component={m.h1}
            variants={varFade().in}
            fontSize={84}
            color="common.white"
            fontFamily="Godo, sans-serif"
            mb={5}
          >
            인쇄골목
          </Typography>
          <AppStoreLinkButton mode="light" />
        </Stack>

        <Box
          component={m.div}
          variants={varScale().inX}
          sx={{ position: 'absolute', bottom: 0, mb: 5 }}
        >
          <IconButton
            onClick={goDown}
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover()}
          >
            <Iconify icon="ic:round-keyboard-arrow-down" color="common.white" width={80} />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
