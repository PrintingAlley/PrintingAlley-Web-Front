import { Box, ButtonBase, Container, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varBounce, varFade, varHover } from 'src/components/animate';
import { APPLE_APP_STORE_URL } from 'src/constants/commons';

export default function Section1() {
  const onClickAppStore = () => {
    window.open(APPLE_APP_STORE_URL);
  };

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
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
        <Box className="road-container" />

        <Stack
          component={m.div}
          variants={varFade().in}
          alignItems="center"
          sx={{ zIndex: 1, mb: 6, userSelect: 'none' }}
        >
          <Typography variant="h4" color="primary.lighter">
            인쇄로 가는 지름길
          </Typography>
          <Typography
            fontSize={84}
            fontWeight="bold"
            color="common.white"
            fontFamily="Godo, sans-serif"
            textAlign="center"
          >
            인쇄골목
          </Typography>
        </Stack>
        <m.div variants={varBounce().inUp}>
          <ButtonBase
            onClick={onClickAppStore}
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover()}
          >
            <Box component="img" src="/assets/about-app/download-white.svg" sx={{ height: 64 }} />
          </ButtonBase>
        </m.div>
      </Container>
    </Box>
  );
}
