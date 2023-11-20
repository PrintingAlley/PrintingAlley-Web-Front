import { IconButton } from '@mui/material';
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
    <IconButton
      size="large"
      onClick={scrollToTop}
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
        color: 'common.white',
        opacity: isVisible ? 1 : 0,
        transition: (theme) => theme.transitions.create('opacity'),
        backgroundColor: 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        boxShadow: (theme) => theme.shadows[4],
      }}
    >
      <Iconify icon="ic:round-arrow-upward" />
    </IconButton>
  );
}
