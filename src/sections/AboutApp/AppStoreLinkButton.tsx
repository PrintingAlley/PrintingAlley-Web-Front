import { Box, ButtonBase } from '@mui/material';
import { m } from 'framer-motion';
import { varBounce, varHover } from 'src/components/animate';
import { APPLE_APP_STORE_URL } from 'src/constants/commons';

export default function AppStoreLinkButton({ mode = 'dark' }: { mode?: 'light' | 'dark' }) {
  const onClickAppStore = () => {
    window.open(APPLE_APP_STORE_URL);
  };

  return (
    <m.div variants={varBounce({ delay: 1 }).inUp}>
      <ButtonBase
        onClick={onClickAppStore}
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover()}
        sx={{ borderRadius: 1.5 }}
      >
        <Box
          component="img"
          src={`/assets/about-app/download-${mode === 'dark' ? 'black' : 'white'}.svg`}
          sx={{ height: 64, WebkitUserDrag: 'none' }}
        />
      </ButtonBase>
    </m.div>
  );
}
