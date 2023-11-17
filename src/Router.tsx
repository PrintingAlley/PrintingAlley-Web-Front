import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import BookmarkPage from './pages/BookmarkPage';
import ContentDetailPage from './pages/ContentDetailPage';
import ContentPage from './pages/ContentPage';
import ContentWebViewPage from './pages/ContentWebViewPage';
import MyPage from './pages/MyPage';
import NewContentPage from './pages/NewContentPage';
import NewPrintShopPage from './pages/NewPrintShopPage';
import NewProductPage from './pages/NewProductPage';
import PrintShopDetailPage from './pages/PrintShopDetailPage';
import PrintShopPage from './pages/PrintShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductPage from './pages/ProductPage';
import MyReviewPage from './pages/MyReviewPage';
import AdminNewProductPage from './pages/Admin/AdminNewProductPage';
import AdminUpdateProductPage from './pages/Admin/AdminUpdateProductPage';
import ProtectedRoute from './sections/Auth/ProtectedRoute';
import AdminProtectedRoute from './sections/Auth/AdminProtectedRoute';
import { UserType } from './types/response.dto';
import NotFoundPage from './pages/NotFoundPage';

function createProtectedRoute(path: string, Component: React.ComponentType) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      }
    />
  );
}

function createAdminRoute(path: string, Component: React.ComponentType) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <AdminProtectedRoute>
          <Component />
        </AdminProtectedRoute>
      }
    />
  );
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

      {isAuthenticated && [
        createProtectedRoute('/print-shop/new', NewPrintShopPage),
        createProtectedRoute('/product/new', NewProductPage),
        createProtectedRoute('/bookmark', BookmarkPage),
        createProtectedRoute('/my', MyPage),
        createProtectedRoute('/my/review', MyReviewPage),
      ]}

      {user?.userType === UserType.ADMIN && [
        createAdminRoute('/admin/product/new/:printShopId', AdminNewProductPage),
        createAdminRoute('/admin/product/:printShopId/:id', AdminUpdateProductPage),
        createAdminRoute('/content/new', NewContentPage),
      ]}

      <Route path="/login" element={<Navigate to="/" />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
