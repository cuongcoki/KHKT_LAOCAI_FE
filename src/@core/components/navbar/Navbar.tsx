import { FC, useState } from "react";
import { Menu, Bell, Settings, User, LogOut } from "lucide-react";
import { Breadcrumbs } from "../ui/Breadcrumbs";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu1";
import { useNotification } from "@/services/useNotification";
import { useBreadcrumbs } from "../ui/hooks/useBreadcrumbs";
import { useAuthStore } from "@/utility/stores/authStore";
import { getRoleDefaultPath } from "./getRoleDefaultPath";
import { toast } from "sonner";

export interface NavbarProps {
  setMenuVisibility?: (visible: boolean) => void;
  isMobile?: boolean;
  menuVisibility?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  showUserAvatar?: boolean;
  notificationCount?: number;
  onSearchChange?: (value: string) => void;
  onNotificationClick?: () => void;
  onSettingsClick?: () => void;
  onUserClick?: () => void;
  searchPlaceholder?: string;
}

const Navbar: FC<NavbarProps> = ({
  setMenuVisibility,
  isMobile = false,
  showNotifications = true,
  showUserAvatar = true,
  onNotificationClick,
}) => {
  const navigate = useNavigate();
  const breadcrumbItems = useBreadcrumbs();
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount } = useNotification();

  // ✅ Get user from auth store
  const { user, logout } = useAuthStore();

  // ✅ Get user initials
  const getUserInitials = (): string => {
    if (!user?.full_name) return "U";
    const names = user.full_name.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user.full_name.substring(0, 2).toUpperCase();
  };

  // ✅ Get role display name
  const getRoleDisplayName = (): string => {
    if (!user?.role) return "User";
    
    const roleMap: Record<string, string> = {
      admin: "Quản trị viên",
      teacher: "Giáo viên",
      student: "Học sinh",
    };
    
    return roleMap[user.role] || user.role;
  };

  // ✅ Navigate to profile
  const handleProfileClick = () => {
    if (!user?.role) return;
    
    const basePath = getRoleDefaultPath(user.role);
    navigate(`${basePath}`);
    setIsOpen(false);
  };

  // ✅ Navigate to settings
  const handleSettingsClick = () => {
    if (!user?.role) return;
    
    const basePath = getRoleDefaultPath(user.role);
    navigate(`${basePath}/settings`);
    setIsOpen(false);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Đăng xuất thành công");
    setIsOpen(false);
  };

  return (
    <div className="bg-white dark:bg-transparent border-b border-gray-200 dark:border-transparent flex items-center justify-between px-4 md:px-6 py-3">
      {/* Mobile Menu Toggle */}
      {isMobile && setMenuVisibility && (
        <button
          onClick={() => setMenuVisibility(true)}
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Breadcrumbs */}
      <div className="flex-1 max-w-2xl">
        <Breadcrumbs
          items={breadcrumbItems}
          onNavigate={(href) => navigate(href)}
          showHome={false}
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        {showNotifications && (
          <button
            onClick={onNotificationClick}
            className="relative text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-[10px] font-bold bg-gradient-to-r from-[#00994C] to-[#0077CC] text-white rounded-full">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        )}

        {/* User Avatar */}
        {showUserAvatar && user && (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-1 rounded-lg transition-all group"
                aria-label="User menu"
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00994C] via-[#008C8C] to-[#0077CC] flex items-center justify-center group-hover:scale-110 transition-transform shadow-md overflow-hidden">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.full_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-white">
                      {getUserInitials()}
                    </span>
                  )}
                </div>

                {/* User Info */}
                <div className="hidden md:flex flex-col items-start leading-tight text-left">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.full_name || "User"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {getRoleDisplayName()}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-lg"
              align="end"
              side="bottom"
            >
              {/* Profile */}
              <DropdownMenuItem
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                onClick={handleProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>

              {/* Settings */}
              <DropdownMenuItem
                className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                onClick={handleSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
                className="flex items-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Navbar;