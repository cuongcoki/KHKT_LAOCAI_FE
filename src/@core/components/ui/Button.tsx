import { motion, type HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'default'|'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children?: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

interface ButtonIconProps extends HTMLMotionProps<'button'> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
  isLoading?: boolean;
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200';

    // Variant styles với primary-dark và primary-light
    const variants = {
      default: '',
      primary: 'bg-primary-light text-white hover:bg-primary-light/90 focus:ring-primary-light',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
      success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      outline: 'border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-white focus:ring-primary-light',
      ghost: 'text-primary-light hover:bg-primary-light/20 focus:ring-primary-light',
      gradient: 'bg-gradient-to-r from-primary-light to-primary-dark text-white hover:from-primary-light/90 hover:to-primary-dark/90 focus:ring-primary-light',
    };

    // Size styles
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };

    // Loading spinner với animation
    const LoadingSpinner = () => (
      <motion.svg 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </motion.svg>
    );

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Loading...
            </motion.span>
          </>
        ) : (
          <>
            {leftIcon && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {leftIcon}
              </motion.span>
            )}
            {children}
            {rightIcon && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {rightIcon}
              </motion.span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

// ButtonIcon component - chỉ hiển thị icon, không có text
export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles cho icon button
    const baseStyles = 'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200';

    // Variant styles
    const variants = {
      default: '',
      primary: 'bg-primary-light text-white hover:bg-primary-light/90 focus:ring-primary-light',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
      success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
      outline: 'border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-white focus:ring-primary-light',
      ghost: 'text-primary-light hover:bg-primary-light/20 focus:ring-primary-light',
      gradient: 'bg-gradient-to-r from-primary-light to-primary-dark text-white hover:from-primary-light/90 hover:to-primary-dark/90 focus:ring-primary-light',
    };

    // Size styles - vuông vắn cho icon
    const sizes = {
      sm: 'p-1.5 text-sm',
      md: 'p-2 text-base',
      lg: 'p-3 text-lg',
      xl: 'p-4 text-xl',
    };

    // Loading spinner
    const LoadingSpinner = () => (
      <motion.svg 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </motion.svg>
    );

    return (
      <motion.button
        ref={ref}
        whileHover={disabled || isLoading ? {} : { scale: 1.1, rotate: 5 }}
        whileTap={disabled || isLoading ? {} : { scale: 0.9 }}
        className={`
          ${baseStyles} 
          ${variants[variant]} 
          ${sizes[size]} 
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

export default Button;