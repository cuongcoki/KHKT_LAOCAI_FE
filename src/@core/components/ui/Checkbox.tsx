// components/ui/Checkbox.tsx
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Checkbox({ checked, onChange, className = "" }: CheckboxProps) {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      
      <motion.div
        className={`
          w-4 h-4 rounded border-2 flex items-center justify-center
          transition-colors duration-200
          ${checked 
            ? 'bg-blue-500 border-blue-500' 
            : 'bg-white/10 border-white/30 hover:border-white/50'
          }
        `}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: checked ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{ 
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>
    </label>
  );
}