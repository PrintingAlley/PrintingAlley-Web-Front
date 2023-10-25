import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/iconify';
import ThemeModeToggle from './common/ThemeModeToggle';

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
    label: '인쇄사 등록',
    path: '/print-shop/new',
  },
  {
    label: '북마크',
    path: '/bookmark',
  },
  {
    label: '로그인',
    path: '/login',
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [position, setPosition] = useState(window.pageYOffset);
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
          backgroundColor: 'transparent',
          boxShadow: 0,
          transition: 'background-color 0.1s ease-out, box-shadow 0.1s ease-out',
        },
        '&.paper': {
          backgroundColor: theme.palette.background.paper,
          boxShadow: 'rgb(0 0 0 / 8%) 0px 0px 8px',
          transition: 'background-color 0.1s ease-out, box-shadow 0.1s ease-out',
        },
      }}
      className={`${transparent ? 'transparent' : 'paper'}`}
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
        <ThemeModeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
