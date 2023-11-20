import { Fab } from '@mui/material';
import { useEffect, useState } from 'react';
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
      size="medium"
      onClick={scrollToTop}
      color="primary"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        opacity: isVisible ? 1 : 0,
        transition: (theme) => theme.transitions.create('opacity'),
      }}
    >
      <Iconify icon="ic:round-arrow-upward" />
    </Fab>
  );
}
