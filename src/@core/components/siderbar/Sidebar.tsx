import { FC, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SidebarProps, NavLink as NavItem } from "./INavProps";
import { getFilteredLinks } from "./nav";
import { useNavigate, NavLink, useLocation } from "react-router";

const Sidebar: FC<SidebarProps> = ({
  isCollapsed,
  onCollapse,
  userRole 
}) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const navigate = useNavigate();
  const links = getFilteredLinks(userRole);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (link: NavItem) => {
    if (link.href && currentPath === link.href) return true;
    if (link.hrefCon && link.hrefCon.some((href) => currentPath === href))
      return true;
    return false;
  };

  const isMenuExpanded = (title: string) => expandedMenus.includes(title);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-transparent border-r border-gray-200 dark:border-transparent transition-all duration-300 z-40 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-slate-800">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-linear-to-r from-[#00994C] via-[#008C8C] to-[#0077CC] bg-clip-text text-transparent">
              Logo
            </h1>
          )}
          <button
            onClick={() => onCollapse(!isCollapsed)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-all text-gray-700 dark:text-gray-300 ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-700">
          {links.map((link, index) => (
            <div key={index}>
              {/* Main Link */}
              <button
                onClick={() => {
                  if (link.hrefCon) {
                    toggleMenu(link.title);
                  } else if (link.href) {
                    navigate(link.href);
                  }
                }}
                className={`
                  w-full flex items-center gap-3 rounded-lg transition-all duration-200 ${
                    isCollapsed ? "py-3 px-3" : "py-2.5 px-4"
                  }
                  ${
                    isActive(link)
                      ? "bg-gradient-to-r from-[#00994C] via-[#008C8C] to-[#0077CC] text-white shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }
                  ${isCollapsed ? "justify-center" : "justify-between"}
                `}
              >
                <div className="flex items-center gap-3">
                  <link.icon
                    className={`${
                      !isCollapsed ? "w-5 h-5" : "w-5 h-5"
                    } flex-shrink-0`}
                  />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{link.title}</span>
                  )}
                </div>

                {!isCollapsed && link.hrefCon && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isMenuExpanded(link.title) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Sub-menu */}
              {link.hrefCon && !isCollapsed && (
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${
                      isMenuExpanded(link.title)
                        ? "max-h-96 opacity-100 mt-1"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >
                  <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-slate-700 space-y-1">
                    {link.hrefCon.map((subHref, subIndex) => {
                      const subTitle = subHref.split("/").pop() || "";
                      return (
                        <NavLink
                          key={subIndex}
                          to={subHref}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all duration-200 capitalize text-sm ${
                              isActive
                                ? "bg-teal-50 dark:bg-slate-800 text-[#008C8C] dark:text-[#00994C] font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50"
                            }`
                          }
                        >
                          {subTitle}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;