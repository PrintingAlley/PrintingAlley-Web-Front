import { Box, Container, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { MotionViewport, varFade } from 'src/components/animate';
import AppStoreLinkButton from './AppStoreLinkButton';

export default function Section1() {
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
            color="common.white"
            fontFamily="Godo, sans-serif"
            textAlign="center"
          >
            인쇄골목
          </Typography>
        </Stack>
        <AppStoreLinkButton mode="light" />
      </Container>
    </Box>
  );
}
