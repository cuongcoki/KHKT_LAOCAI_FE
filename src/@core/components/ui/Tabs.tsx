import { ReactNode, useState, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabItem {
  id: string;
  label: string;
  icon?: ComponentType<{ size?: number; className?: string }> | ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'enclosed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export function Tabs({
  items,
  defaultTab,
  onChange,
  variant = 'underline',
  size = 'md',
  fullWidth = false,
  className = '',
  tabClassName = '',
  contentClassName = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    if (items.find(item => item.id === tabId)?.disabled) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getTabClasses = (item: TabItem) => {
    const isActive = activeTab === item.id;
    const baseClasses = `${sizeClasses[size]} font-medium transition-all duration-200 cursor-pointer relative flex items-center gap-2 ${fullWidth ? 'flex-1 justify-center' : ''}`;

    if (item.disabled) {
      return `${baseClasses} opacity-40 cursor-not-allowed`;
    }

    switch (variant) {
      case 'pills':
        return `${baseClasses} rounded-lg ${
          isActive
            ? 'bg-primary text-white shadow-lg'
            : 'text-primary-light hover:bg-primary-light/10'
        }`;
      case 'enclosed':
        return `${baseClasses} rounded-t-lg border-t border-x ${
          isActive
            ? 'bg-primary-dark border-primary-light text-white'
            : 'text-primary-light hover:bg-primary-light/5 border-transparent'
        }`;
      default: // underline
        return `${baseClasses} ${
          isActive
            ? 'text-white'
            : 'text-primary-light hover:text-white/80'
        }`;
    }
  };

  // Render icon helper
  const renderIcon = (icon: TabItem['icon']) => {
    if (!icon) return null;

    // Check if it's a component (function/class)
    if (typeof icon === 'function') {
      const IconComponent = icon as ComponentType<{ size?: number; className?: string }>;
      return <IconComponent size={18} />;
    }

    // Otherwise render as ReactNode
    return icon;
  };

  const activeTabItem = items.find(item => item.id === activeTab);

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`flex ${
          variant === 'underline'
            ? 'border-b border-primary-light/20'
            : variant === 'enclosed'
            ? 'border-b border-primary-light/20'
            : 'gap-2'
        } ${fullWidth ? 'w-full' : ''}`}
        role="tablist"
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              variants={tabVariants}
              whileHover={!item.disabled ? { scale: 1.02 } : {}}
              whileTap={!item.disabled ? { scale: 0.98 } : {}}
              onClick={() => handleTabChange(item.id)}
              className={`${getTabClasses(item)} ${tabClassName}`}
              role="tab"
              aria-selected={isActive}
              aria-disabled={item.disabled}
              disabled={item.disabled}
            >
              {/* Icon */}
              {item.icon && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center"
                >
                  {renderIcon(item.icon)}
                </motion.span>
              )}

              {/* Label */}
              <span>{item.label}</span>

              {/* Badge */}
              {item.badge !== undefined && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary-light/20 text-white"
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Underline Indicator */}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      {activeTabItem?.content && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`mt-4 ${contentClassName}`}
            role="tabpanel"
          >
            {activeTabItem.content}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

// TabsSkeleton - Loading state
export function TabsSkeleton({ 
  items = 4, 
  variant = 'underline' 
}: { 
  items?: number; 
  variant?: 'underline' | 'pills' | 'enclosed';
}) {
  return (
    <div className="w-full">
      <div className={`flex ${variant === 'pills' ? 'gap-2' : ''} ${
        variant === 'underline' ? 'border-b border-primary-light/20' : ''
      }`}>
        {Array.from({ length: items }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
            className={`h-10 bg-primary-light/20 rounded ${
              variant === 'pills' ? 'w-24 rounded-lg' : 'w-28'
            } ${variant === 'enclosed' ? 'rounded-t-lg' : ''}`}
          />
        ))}
      </div>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-4 h-32 bg-primary-light/10 rounded-lg"
      />
    </div>
  );
}

// Controlled Tabs
interface ControlledTabsProps extends Omit<TabsProps, 'defaultTab' | 'onChange'> {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function ControlledTabs({
  items,
  activeTab,
  onTabChange,
  ...props
}: ControlledTabsProps) {
  return (
    <Tabs
      items={items}
      defaultTab={activeTab}
      onChange={onTabChange}
      {...props}
    />
  );
}