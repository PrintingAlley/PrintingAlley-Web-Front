import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade, varFlip, varHover, varScale } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import AppStoreLinkButton from './AppStoreLinkButton';
import { TitleAnimate } from './TitleAnimate';

export default function Section1() {
  const goDown = () => {
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
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
            src="/assets/about-app/section1-marker.png"
            width={80}
            sx={{ position: 'absolute', top: 'calc(50% - 264px)' }}
          />
          <Typography
            component={m.h4}
            variants={varFade().in}
            variant="h4"
            color="primary.lighter"
            gutterBottom
          >
            인쇄로 가는 지름길
          </Typography>
          <TitleAnimate text="인쇄골목" color="common.white" mb={6} />
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
