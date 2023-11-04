// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
// components
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { Routes, Route } from 'react-router-dom';
import Navbar from './sections/common/Navbar';
import Home from './pages/HomePage';
import PrintShop from './pages/PrintShopPage';
import PrintShopDetailPage from './pages/PrintShopDetailPage';
import NewPrintShopPage from './pages/NewPrintShopPage';
import MyPage from './pages/MyPage';
import PageContainer from './sections/common/PageContainer';
import ScrollToTop from './sections/common/ScrollToTop';
import useAuth from './hooks/useAuth';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import NewProductPage from './pages/NewProductPage';

// ----------------------------------------------------------------------

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider>
      <SnackbarProvider>
        <ProgressBar />
        <Navbar />
        <ScrollToTop />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/print-shop" element={<PrintShop />} />
            <Route path="/print-shop/:id" element={<PrintShopDetailPage />} />
            {isAuthenticated && (
              <>
                <Route path="/product/new" element={<NewProductPage />} />
                <Route path="/print-shop/new" element={<NewPrintShopPage />} />
                <Route path="/bookmark" element={<Home />} />
                <Route path="/my" element={<MyPage />} />
              </>
            )}
            <Route path="*" element={<Home />} />
          </Routes>
        </PageContainer>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
