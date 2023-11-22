import { fullpageApi } from '@fullpage/react-fullpage';
import { Box, ButtonBase, IconButton, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { APPLE_APP_STORE_URL } from 'src/constants/commons';

export default function Section1({ fullpage }: { fullpage: fullpageApi }) {
  const onClickAppStore = () => {
    window.open(APPLE_APP_STORE_URL);
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'primary.main',
      }}
      spacing={1}
    >
      <Box className="road-container" />

      <Box
        component={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.02 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        sx={{ zIndex: 1 }}
      >
        <Typography variant="h4" color="primary.lighter" sx={{ userSelect: 'none' }}>
          인쇄로 가는 지름길
        </Typography>
      </Box>
      <Box
        component={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        sx={{ zIndex: 1, mb: 4 }}
      >
        <Typography
          fontSize={80}
          fontWeight="bold"
          color="common.white"
          fontFamily="Godo, sans-serif"
          textAlign="center"
          sx={{ letterSpacing: 3, userSelect: 'none' }}
        >
          인쇄골목
        </Typography>
      </Box>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 1.2, delay: 2, ease: 'easeOut' }}
      >
        <ButtonBase
          onClick={onClickAppStore}
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover()}
          sx={{
            color: 'primary.main',
            backgroundColor: 'common.white',
            '&:hover': {
              backgroundColor: 'common.white',
            },
            p: '16px 20px',
            gap: 2,
            borderRadius: 1.5,
          }}
        >
          <Iconify icon="mdi:apple" width={32} />
          <Typography variant="h4">App Store</Typography>
        </ButtonBase>
      </m.div>

      <Box
        component={m.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          mb: 5,
        }}
      >
        <IconButton
          onClick={() => fullpage.moveSectionDown()}
          component={m.button}
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatType: 'reverse',
          }}
        >
          <Iconify icon="ic:round-keyboard-arrow-down" color="common.white" width={64} />
        </IconButton>
      </Box>
    </Stack>
  );
}
