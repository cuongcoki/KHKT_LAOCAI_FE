// components/PublicRoute.tsx
import { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/utility/stores/authStore';
import { storage } from '@/utility/lib/storage';
import { IUser } from '@/domain/interfaces/IUser';
import { getRoleDefaultPath } from './roleRedirects';

interface PublicRouteProps {
  children: ReactNode;
  redirectIfAuthenticated?: boolean; // Thêm prop này
}

const PublicRoute: FC<PublicRouteProps> = ({ 
  children, 
  redirectIfAuthenticated = false 
}) => {
  const { isAuthenticated, user, isLoading, setUser } = useAuthStore();

  // Khôi phục user từ localStorage khi mount
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
          <p className="text-white dark:text-gray-100 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Nếu đã đăng nhập và route yêu cầu redirect → chuyển về trang dashboard của role
  if (redirectIfAuthenticated && isAuthenticated && user) {
    const defaultPath = getRoleDefaultPath(user.role);
    return <Navigate to={defaultPath} replace />;
  }

  // Cho phép truy cập public route
  return <>{children}</>;
};

export default PublicRoute;