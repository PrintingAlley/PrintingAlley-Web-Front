import { Routes, Route } from 'react-router';
import useAuth from './hooks/useAuth';
import BookmarkPage from './pages/BookmarkPage';
import ContentDetailPage from './pages/ContentDetailPage';
import ContentPage from './pages/ContentPage';
import ContentWebViewPage from './pages/ContentWebViewPage';
import HomePage from './pages/HomePage';
import MyPage from './pages/MyPage';
import NewContentPage from './pages/NewContentPage';
import NewPrintShopPage from './pages/NewPrintShopPage';
import NewProductPage from './pages/NewProductPage';
import PrintShopDetailPage from './pages/PrintShopDetailPage';
import PrintShopPage from './pages/PrintShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';

function PrintShopOwnerRoutes() {
  return [
    <Route key="new-print-shop" path="/print-shop/new" element={<NewPrintShopPage />} />,
    <Route key="new-product" path="/product/new" element={<NewProductPage />} />,
  ];
}

function AdminRoutes() {
  return [
    ...PrintShopOwnerRoutes(),
    <Route key="new-content" path="/content/new" element={<NewContentPage />} />,
  ];
}

function AuthenticatedRoutes() {
  return [
    <Route key="bookmark" path="/bookmark" element={<BookmarkPage />} />,
    <Route key="my" path="/my" element={<MyPage />} />,
  ];
}

export default function Router() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/content/:id" element={<ContentDetailPage />} />
      <Route path="/content-webview/:id" element={<ContentWebViewPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/print-shop" element={<PrintShopPage />} />
      <Route path="/print-shop/:id" element={<PrintShopDetailPage />} />
      {isAuthenticated && [...AuthenticatedRoutes()]}
      {user?.userType === 'PRINT_SHOP_OWNER' && [...PrintShopOwnerRoutes()]}
      {user?.userType === 'ADMIN' && [...AdminRoutes()]}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
