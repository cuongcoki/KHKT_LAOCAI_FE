// components/ui/DateInput.tsx
import { forwardRef, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";

export interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      error,
      className = "",
      containerClassName = "",
      value,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative ${containerClassName}`}>
        {/* Label */}
        {label && (
          <motion.label
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-2 left-2 text-xs text-white/70 bg-white/10 px-1.5 rounded z-10"
          >
            {label}
          </motion.label>
        )}

        {/* Input Container */}
        <div className="relative">
          <motion.input
            ref={ref}
            type="date"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`
              w-full px-3 py-2 text-sm
              backdrop-blur-md bg-white/10 
              border border-white/20 rounded-lg 
              text-white
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
              hover:bg-white/15 hover:border-white/30
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-red-500/50 focus:ring-red-500/50" : ""}
              ${className}
              
              /* Custom date input styling */
              [&::-webkit-calendar-picker-indicator]:opacity-0
              [&::-webkit-calendar-picker-indicator]:absolute
              [&::-webkit-calendar-picker-indicator]:inset-0
              [&::-webkit-calendar-picker-indicator]:w-full
              [&::-webkit-calendar-picker-indicator]:h-full
              [&::-webkit-calendar-picker-indicator]:cursor-pointer
            `}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            {...props}
          />

          {/* Calendar Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";