import { FC, useEffect, useState } from "react";
import { Menu, X, LogIn, Sparkles } from "lucide-react";
import { ColorText } from "../GradientButton";
import { Link } from "react-router";
import { useAuthStore } from "@/utility";
import logoCBlog from "@/assets/images/logo/logo_c_blog_light.png";

interface NavbarProps {
  isMobile?: boolean;
}

const Navbar: FC<NavbarProps> = ({ isMobile }) => {
  const { user } = useAuthStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "My Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full transition-all duration-500 z-50 ${
        isScrolled
          ? " backdrop-blur-xl shadow-md  bg-white/10 dark:bg-black/80  border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="relative group flex-shrink-0">
          <img
            src={logoCBlog}
            alt="C Blog"
            className="w-24 md:w-32 transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Sparkles className="w-4 h-4 text-[var(--color-primary-light)] animate-pulse" />
          </div>
        </Link>

        {/* 🔹 Desktop Menu */}
        {!isMobile && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                href={link.path}
                className="relative text-white text-lg font-medium group"
              >
                <ColorText text={link.name} className="font-cookie text-4xl " />
                <span
                  className="absolute left-0 bottom-0 w-0 h-0.5 
    bg-gradient-to-r from-cyan-400 to-blue-500 
    group-hover:w-full transition-all duration-300 ease-out"
                ></span>
              </a>
            ))}

            {user?.role === "admin" ? (
              <Link to={"/admin/dashboard"}>
                <button
                  className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all bg-primary-light text-white hover:bg-primary-dark`}
                >
                  <LogIn className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
            ) : user?.role === "user" ? null : (
              <Link to={"/login"}>
                <button
                  className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all bg-primary-light text-white hover:bg-primary-dark`}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </Link>
            )}
          </div>
        )}

        {/* 🔹 Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg focus:outline-none transition-all"
          >
            {isMenuOpen ? (
              <X
                className={`h-6 w-6 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-6 w-6 ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              />
            )}
          </button>
        )}
      </div>

      {/* 🔹 Mobile Menu Drawer */}
      {isMobile && (
        <div
          className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-lg flex flex-col items-center justify-center gap-6 text-gray-800 transition-all duration-500 z-40 ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-gray-700"
          >
            <X className="h-7 w-7" />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-medium hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}

          {user?.role === "admin" ? (
            <Link to={"/admin/dashboard"}>
              <button
                className={`flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all`}
              >
                <LogIn className="w-4 h-4" />
                Dashboard
              </button>
            </Link>
          ) :  user?.role === "user" ? null : (
            <Link to={"/login"}>
              <button
                className={`flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all`}
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
