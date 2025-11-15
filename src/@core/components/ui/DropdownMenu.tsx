// components/ui/DropdownMenu.tsx
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Context để quản lý state của dropdown
interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within DropdownMenu");
  }
  return context;
};

// Root component
interface DropdownMenuProps {
  children: React.ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, toggleOpen }}>
      <div ref={dropdownRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Trigger button
interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownTrigger({ children, className = "" }: DropdownTriggerProps) {
  const { toggleOpen } = useDropdown();

  return (
    <motion.button
      onClick={toggleOpen}
      className={className}
      whileTap={{ scale: 0.95 }}
      type="button"
    >
      {children}
    </motion.button>
  );
}

// Content wrapper
interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "right" | "center";
}

export function DropdownContent({ 
  children, 
  className = "",
  align = "right" 
}: DropdownContentProps) {
  const { isOpen } = useDropdown();

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`
            absolute ${alignmentClasses[align]} mt-2 z-50
            min-w-[200px] rounded-xl
            backdrop-blur-xl bg-white/10 
            border border-white/20
            shadow-2xl shadow-black/20
            overflow-hidden
            ${className}
          `}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Menu item
interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function DropdownItem({ 
  children, 
  onClick, 
  className = "",
  icon,
  disabled = false
}: DropdownItemProps) {
  const { setIsOpen } = useDropdown();

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
      setIsOpen(false);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full px-4 py-2.5 text-left text-sm
        flex items-center gap-3
        transition-colors duration-150
        ${disabled 
          ? 'text-white/40 cursor-not-allowed' 
          : 'text-white hover:bg-white/10 cursor-pointer'
        }
        ${className}
      `}
      whileHover={!disabled ? { x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}

// Separator
export function DropdownSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px bg-white/10 my-1 ${className}`} />
  );
}

// Label (for grouping)
interface DropdownLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownLabel({ children, className = "" }: DropdownLabelProps) {
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider ${className}`}>
      {children}
    </div>
  );
}