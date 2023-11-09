import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/iconify';
import useAuth from 'src/hooks/useAuth';
import Logo from 'src/components/logo';
import ThemeModeToggle from './ThemeModeToggle';
import LoginModal from '../Login/LoginModal';

const authenticatedNavbarItems = [
  {
    label: '인쇄 골목',
    path: '/',
  },
  {
    label: '인쇄사 목록',
    path: '/print-shop',
  },
  {
    label: '콘텐츠',
    path: '/content',
  },
  {
    label: '북마크',
    path: '/bookmark',
  },
  {
    label: '내 정보',
    path: '/my',
  },
];

const defaultNavbarItems = [
  {
    label: '인쇄 골목',
    path: '/',
  },
  {
    label: '인쇄사 목록',
    path: '/print-shop',
  },
  {
    label: '콘텐츠',
    path: '/content',
  },
];

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [position, setPosition] = useState(window.pageYOffset);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navbarItems = isAuthenticated ? authenticatedNavbarItems : defaultNavbarItems;
  const isContentDetailPage =
    location.pathname.includes('/content/') && location.pathname !== '/content/new';

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

  const transparent = position < (theme.mixins.toolbar.minHeight as number);

  useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        '&.transparent': {
          color: isContentDetailPage ? 'common.white' : 'inherit',
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: 'background-color 0.1s ease-out, box-shadow 0.1s ease-out',
        },
        '&.paper': {
          backgroundColor: 'background.paper',
          boxShadow: 'rgb(0 0 0 / 8%) 0px 0px 8px',
          transition: 'background-color 0.1s ease-out, box-shadow 0.1s ease-out',
        },
      }}
      className={`${transparent ? 'transparent' : 'paper'}`}
    >
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          {navbarItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  color: isActive ? 'primary.main' : 'inherit',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                {item.label}
              </Button>
            );
          })}
          <LoginModal />
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
            <LoginModal isMenuItem onClick={handleCloseNavMenu} />
          </Menu>
        </Box>
        <ThemeModeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
