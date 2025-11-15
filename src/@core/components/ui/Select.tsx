import { createContext, useContext, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

// Context
interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  toggleOpen: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
};

// Root component
interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const onChange = (newValue: string) => {
    onValueChange(newValue);
    setIsOpen(false);
  };

  // Đóng select khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        // Kiểm tra xem click có phải vào dropdown content không
        if (!target.closest('[data-select-content]')) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Đóng khi nhấn Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, value, onChange, toggleOpen, triggerRef }}>
      <div className="relative inline-block w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

// Trigger button
interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}

export function SelectTrigger({ 
  children, 
  className = "",
  placeholder = "Chọn..."
}: SelectTriggerProps) {
  const { toggleOpen, isOpen, value, triggerRef } = useSelect();

  return (
    <motion.button
      ref={triggerRef}
      onClick={toggleOpen}
      className={`
        w-full px-4 py-2.5 rounded-lg
        backdrop-blur-xl bg-white/10 
        border border-white/20
        text-white text-left
        flex items-center justify-between gap-2
        transition-all duration-200
        hover:bg-white/15 hover:border-white/30
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
        ${isOpen ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''}
        ${className}
      `}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      <span className={value ? 'text-white' : 'text-white/50'}>
        {children || placeholder}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4 text-white/70" />
      </motion.div>
    </motion.button>
  );
}

// Content wrapper với Portal
interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className = "" }: SelectContentProps) {
  const { isOpen, triggerRef } = useSelect();
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Tính toán vị trí của dropdown
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
          setPosition({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
            width: rect.width
          });
        }
      };

      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        data-select-content
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className={`
          fixed z-[9999]
          max-h-[300px] overflow-y-auto
          rounded-xl
          backdrop-blur-xl bg-white/10 
          border border-white/20
          shadow-2xl shadow-black/20
          ${className}
        `}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
        }}
      >
        <div className="py-1">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

// Option item
interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SelectItem({ 
  value: itemValue, 
  children, 
  className = "",
  disabled = false
}: SelectItemProps) {
  const { value: selectedValue, onChange } = useSelect();
  const isSelected = selectedValue === itemValue;

  const handleClick = () => {
    if (!disabled) {
      onChange(itemValue);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full px-4 py-2.5 text-left text-sm
        flex items-center justify-between gap-3
        transition-colors duration-150
        ${disabled 
          ? 'text-white/40 cursor-not-allowed' 
          : 'text-white hover:bg-white/10 cursor-pointer'
        }
        ${isSelected ? 'bg-blue-500/20' : ''}
        ${className}
      `}
      whileHover={!disabled ? { x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <span>{children}</span>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-4 h-4 text-blue-400" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Label
interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectLabel({ children, className = "" }: SelectLabelProps) {
  return (
    <div className={`px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider ${className}`}>
      {children}
    </div>
  );
}

// Separator
export function SelectSeparator({ className = "" }: { className?: string }) {
  return (
    <div className={`h-px bg-white/10 my-1 ${className}`} />
  );
}

// Value component
interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export function SelectValue({ placeholder = "Chọn..." }: SelectValueProps) {
  const { value } = useSelect();
  return <>{value || placeholder}</>;
}