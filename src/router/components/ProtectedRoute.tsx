// components/ProtectedRoute.tsx
import { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuthStore } from '@/utility/stores/authStore';
import { storage } from '@/utility/lib/storage';
import { IUser } from '@/domain/interfaces/IUser';
import {  isPathAllowedForRole } from './roleRedirects';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('admin' | 'teacher' | 'student')[];
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { isAuthenticated, user, isLoading, setUser } = useAuthStore();

  // Khôi phục user từ localStorage khi mount (nếu chưa có trong state)
  useEffect(() => {
    if (!user && !isLoading) {
      const storedUser = storage.getUser<IUser>();
      const token = storage.getToken();
      
      if (storedUser && token) {
        setUser(storedUser);
      }
    }
  }, [user, isLoading, setUser]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary-light to-secondary dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
          <p className="text-white dark:text-gray-100 font-medium">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Chưa đăng nhập → redirect về /login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Kiểm tra quyền truy cập theo allowedRoles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Route tồn tại nhưng role không được phép → /not-authorized
    return <Navigate to="/not-authorized" replace />;
  }

  // Kiểm tra xem user có đang cố truy cập route không được phép không
  if (!isPathAllowedForRole(location.pathname, user.role)) {
    // Route không được phép cho role này → /not-authorized
    return <Navigate to="/not-authorized" replace />;
  }

  // Hợp lệ → render children
  return <>{children}</>;
};

export default ProtectedRoute;