// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
// components
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { Routes, Route } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import Navbar from './sections/Navbar';
import Home from './pages/HomePage';
import PrintShop from './pages/PrintShopPage';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <ProgressBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/print-shop" element={<PrintShop />} />
        </Routes>
        <Toolbar />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
