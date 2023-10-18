import { AppBar, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navbarItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Print Shop',
    path: '/print-shop',
  },
  {
    label: 'Bookmark',
    path: '/bookmark',
  },
  {
    label: 'Tag',
    path: '/tag',
  },
  {
    label: 'Auth',
    path: '/auth',
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {navbarItems.map((item) => (
          <Button key={item.label} onClick={() => navigate(item.path)}>
            {item.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
