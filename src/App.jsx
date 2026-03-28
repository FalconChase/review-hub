import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';
import AccessLicenses from './pages/admin/AccessLicenses';
import ModulesContent from './pages/admin/ModulesContent';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

import UserDashboard from './pages/user/UserDashboard';
import MyScores from './pages/user/MyScores';
import Progress from './pages/user/Progress';
import ProductDetail from './pages/user/ProductDetail';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <ThemeProvider storageKey="adminTheme">
                <AdminLayout />
              </ThemeProvider>
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products"  element={<Products />} />
          <Route path="users"     element={<Users />} />
          <Route path="access"    element={<AccessLicenses />} />
          <Route path="modules"   element={<ModulesContent />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings"  element={<Settings />} />
        </Route>

        {/* User */}
        <Route
          path="/dashboard/*"
          element={
            <UserRoute>
              <ThemeProvider storageKey="userTheme">
                <UserLayout />
              </ThemeProvider>
            </UserRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="scores"        element={<MyScores />} />
          <Route path="progress"      element={<Progress />} />
          <Route path="product/:id"   element={<ProductDetail />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
