// components/ui/Input.tsx
import { forwardRef, useState, InputHTMLAttributes } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { X, Eye, EyeOff } from "lucide-react";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      type = "text",
      className = "",
      containerClassName = "",
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = value !== undefined && value !== null && value !== "";

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange({ target: { value: "" } } as any);
      }
    };

    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;

    return (
      <div className={`w-full ${containerClassName}`}>
        {/* Label */}
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-sm font-medium text-white/90 mb-2"
          >
            {label}
          </motion.label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <motion.input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={`
              w-full px-4 py-2.5 text-sm
              backdrop-blur-md bg-white/10 
              border border-white/20 rounded-lg 
              text-white placeholder-white/50
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
              disabled:opacity-50 disabled:cursor-not-allowed
              ${leftIcon ? "pl-10" : ""}
              ${(rightIcon || clearable || isPasswordType) ? "pr-10" : ""}
              ${error ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50" : ""}
              ${isFocused ? "bg-white/15 border-white/30" : "hover:bg-white/15 hover:border-white/30"}
              ${className}
            `}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            {...props}
          />

          {/* Right Side Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {/* Clear Button */}
            <AnimatePresence>
              {clearable && hasValue && !disabled && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleClear}
                  type="button"
                  className="text-white/60 hover:text-white transition-colors p-0.5"
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            {isPasswordType && (
              <motion.button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="text-white/60 hover:text-white transition-colors p-0.5"
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.div
                      key="eye-off"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.15 }}
                    >
                      <EyeOff className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -180 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Eye className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            {/* Custom Right Icon */}
            {rightIcon && !clearable && !isPasswordType && (
              <div className="text-white/60">{rightIcon}</div>
            )}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
            >
              <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Helper Text */}
        {helperText && !error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 text-xs text-white/50"
          >
            {helperText}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";