import { Fab } from '@mui/material';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { varHover } from 'src/components/animate';
import Iconify from 'src/components/iconify';

export default function ScrollToTopButton() {
  const appearThreshold = 100;
  const [scrollY, setScrollY] = useState(window.scrollY);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isVisible = scrollY > appearThreshold;

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.scrollY;
      setScrollY(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Fab
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover()}
      color="primary"
      size="medium"
      onClick={scrollToTop}
      sx={{
        display: isVisible ? 'flex' : 'none',
        position: 'fixed',
        bottom: 24,
        right: 24,
      }}
    >
      <Iconify icon="ic:round-arrow-upward" />
    </Fab>
  );
}
