// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// editor
import 'react-quill/dist/quill.snow.css';

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
import { MotionLazy } from './components/animate/motion-lazy';
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
import NewContentPage from './pages/NewContentPage';
import ContentDetailPage from './pages/ContentDetailPage';
import ContentWebViewPage from './pages/ContentWebViewPage';
import ContentPage from './pages/ContentPage';
import BookmarkPage from './pages/BookmarkPage';

// ----------------------------------------------------------------------

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider>
      <MotionLazy>
        <SnackbarProvider>
          <ProgressBar />
          <Navbar />
          <ScrollToTop />
          <PageContainer>
            <Routes>
              <Route path="/" element={<ContentPage />} />
              <Route path="/content/:id" element={<ContentDetailPage />} />
              <Route path="/content-webview/:id" element={<ContentWebViewPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/print-shop" element={<PrintShop />} />
              <Route path="/print-shop/:id" element={<PrintShopDetailPage />} />
              {isAuthenticated && (
                <>
                  <Route path="/content/new" element={<NewContentPage />} />
                  <Route path="/product/new" element={<NewProductPage />} />
                  <Route path="/print-shop/new" element={<NewPrintShopPage />} />
                  <Route path="/bookmark" element={<BookmarkPage />} />
                  <Route path="/my" element={<MyPage />} />
                </>
              )}
              <Route path="*" element={<Home />} />
            </Routes>
          </PageContainer>
        </SnackbarProvider>
      </MotionLazy>
    </ThemeProvider>
  );
}
