import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import AdminNewProductPage from 'src/pages/Admin/AdminNewProductPage';
import AdminUpdateProductPage from 'src/pages/Admin/AdminUpdateProductPage';
import BookmarkPage from 'src/pages/BookmarkPage';
import ContentDetailPage from 'src/pages/ContentDetailPage';
import ContentPage from 'src/pages/ContentPage';
import ContentWebViewPage from 'src/pages/ContentWebViewPage';
import MyPage from 'src/pages/MyPage';
import MyReviewPage from 'src/pages/MyReviewPage';
import NewContentPage from 'src/pages/NewContentPage';
import NewPrintShopPage from 'src/pages/NewPrintShopPage';
import NewProductPage from 'src/pages/NewProductPage';
import NotFoundPage from 'src/pages/NotFoundPage';
import PrintShopDetailPage from 'src/pages/PrintShopDetailPage';
import PrintShopPage from 'src/pages/PrintShopPage';
import ProductDetailPage from 'src/pages/ProductDetailPage';
import ProductPage from 'src/pages/ProductPage';
import AdminProtectedRoute from 'src/sections/Auth/AdminProtectedRoute';
import ProtectedRoute from 'src/sections/Auth/ProtectedRoute';
import { UserType } from 'src/types/response.dto';

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
      <Route path="/" element={<Navigate to="/product" />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/content/:id" element={<ContentDetailPage />} />
      <Route path="/content-webview/:id" element={<ContentWebViewPage />} />
      <Route path="/product" element={<ProductPage />} />
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
