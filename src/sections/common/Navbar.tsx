import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Iconify from 'src/components/iconify/iconify';
import Logo from 'src/components/logo';
import { paths } from 'src/routes/path';
import ThemeModeToggle from './ThemeModeToggle';
import LoginModal from '../Login/LoginModal';
import AccountPopover from './AccountPopover';

const navbarItems = [
  {
    label: '앱 소개',
    path: paths.aboutApp,
  },
  {
    label: '인쇄골목',
    path: paths.product.root,
  },
  {
    label: '인쇄사 찾기',
    path: paths.printShop.root,
  },
  {
    label: '콘텐츠',
    path: paths.content.root,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [position, setPosition] = useState(window.scrollY);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const isContentDetailPage = pathname.includes('/content/') && pathname !== '/content/new';
  const isAboutAppPage = pathname === '/about-app';

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
      const moving = window.scrollY;
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getColor = () => {
    if (isContentDetailPage) {
      return 'common.white';
    }
    if (isAboutAppPage) {
      return 'grey.800';
    }
    return 'inherit';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        '&.transparent': {
          color: getColor(),
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
        <Stack direction="row" alignItems="center">
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            {navbarItems.map((item) => {
              const isActive = pathname === item.path && !isAboutAppPage;
              return (
                <Button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  sx={{ color: isActive ? 'primary.main' : 'inherit' }}
                >
                  {item.label}
                </Button>
              );
            })}
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
          <Box sx={{ mx: 0.5 }}>
            <LoginModal iconButton />
            <AccountPopover />
          </Box>
          <ThemeModeToggle />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
