import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toast } from './components/ui/Toast';
import ScrollToTop from './components/ui/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';
import Home from './pages/Home';
import Blog from './pages/Blog';
import OfferDetails from './pages/OfferDetails';
import AdminLogin from './pages/Admin/Login';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminOffers from './pages/Admin/Offers';
import AdminBlogList from './components/AdminBlogList';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/offres/:id" element={<OfferDetails />} />
        
        {/* Routes Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminBlogList />} />
          <Route path="offers" element={<AdminOffers />} />
        </Route>
      </Routes>
      <ScrollToTop />
      <Toast />
    </ErrorBoundary>
  );
}