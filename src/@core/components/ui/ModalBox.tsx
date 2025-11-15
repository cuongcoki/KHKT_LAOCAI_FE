// ==================== components/ui/Modal.tsx ====================
import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  showCloseButton?: boolean;
}

interface ModalHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface ModalContentProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

// Main Modal Component
export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  title,
  showCloseButton = true 
}: ModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    }
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ 
              type: "spring",
              duration: 0.3,
              bounce: 0.1
            }}
            className={`relative w-full ${sizes[size]} z-10`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 rounded-lg border border-purple-500/30 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
              {title && (
                <ModalHeader onClose={onClose} showCloseButton={showCloseButton}>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                </ModalHeader>
              )}
              <div className="overflow-y-auto flex-1">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

// Modal Header
export function ModalHeader({ children, onClose, showCloseButton = true }: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/30">
      <div>{children}</div>
      {showCloseButton && onClose && (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="text-purple-400 hover:text-purple-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </motion.button>
      )}
    </div>
  );
}

// Modal Content
export function ModalContent({ children }: ModalContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.2 }}
      className="px-6 py-4"
    >
      {children}
    </motion.div>
  );
}

// Modal Footer
export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.2 }}
      className="px-6 py-4 border-t border-purple-500/30 flex items-center justify-end gap-3"
    >
      {children}
    </motion.div>
  );
}