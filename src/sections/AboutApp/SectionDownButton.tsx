import { fullpageApi } from '@fullpage/react-fullpage';
import { Box, IconButton } from '@mui/material';
import { m } from 'framer-motion';
import React from 'react';
import Iconify from 'src/components/iconify';

interface SectionDownButtonProps {
  isActive: boolean;
  fullpage: fullpageApi;
}

export default function SectionDownButton({ isActive, fullpage }: SectionDownButtonProps) {
  return (
    <Box
      component={m.div}
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 1.5 }}
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
        <Iconify icon="ic:round-keyboard-arrow-down" color="grey.500" width={64} />
      </IconButton>
    </Box>
  );
}
