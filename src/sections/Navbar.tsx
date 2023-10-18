import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/iconify';

const navbarItems = [
  {
    label: '소개',
    path: '/',
  },
  {
    label: '인쇄 골목',
    path: '/print-shop',
  },
  {
    label: '인쇄소 등록',
    path: '/print-shop/new',
  },
  {
    label: '북마크',
    path: '/bookmark',
  },
  {
    label: '로그인',
    path: '/auth',
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onClickMenuItem = (to: string) => {
    navigate(to);
    handleCloseNavMenu();
  };

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop < 56) {
        return;
      }

      if (currentScrollTop > lastScrollTop) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: isVisible ? 0 : (theme) => `-${theme.mixins.toolbar.minHeight}px`,
        transition: 'top 0.3s',
      }}
    >
      <Toolbar>
        <Avatar alt="인쇄 골목" src="/logo192.png" sx={{ width: 40, height: 40 }} />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {navbarItems.map((item) => (
            <Button key={item.label} onClick={() => navigate(item.path)}>
              {item.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
            <Iconify icon="ic:round-menu" />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            {navbarItems.map((page) => (
              <MenuItem key={page.label} onClick={() => onClickMenuItem(page.path)}>
                {page.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
