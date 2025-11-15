import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { createPortal } from "react-dom";

// Utility functions
const DAYS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS = [
  "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
  "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
];

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const isInRange = (date: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

const isToday = (date: Date) => {
  const today = new Date();
  return isSameDay(date, today);
};

// Base Calendar Component
interface CalendarProps {
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  onRangeSelect?: (start: Date, end: Date | null) => void;
  mode?: "single" | "range";
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function Calendar({
  selectedDate,
  onDateSelect,
  startDate,
  endDate,
  onRangeSelect,
  mode = "single",
  minDate,
  maxDate,
  className = "",
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate ? selectedDate.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    selectedDate ? selectedDate.getFullYear() : new Date().getFullYear()
  );
  const [selectingEnd, setSelectingEnd] = useState(false);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    // Check min/max date
    if (minDate && clickedDate < minDate) return;
    if (maxDate && clickedDate > maxDate) return;

    if (mode === "single") {
      onDateSelect?.(clickedDate);
    } else {
      // Range mode
      if (!startDate || (startDate && endDate)) {
        // Start new range
        onRangeSelect?.(clickedDate, null);
        setSelectingEnd(true);
      } else if (selectingEnd) {
        // Set end date
        if (clickedDate >= startDate) {
          onRangeSelect?.(startDate, clickedDate);
          setSelectingEnd(false);
        } else {
          // If clicked date is before start, swap them
          onRangeSelect?.(clickedDate, startDate);
          setSelectingEnd(false);
        }
      }
    }
  };

  const renderDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = mode === "single" 
        ? isSameDay(date, selectedDate || null)
        : isSameDay(date, startDate || null) || isSameDay(date, endDate || null);
      const isInRangeDate = mode === "range" && isInRange(date, startDate || null, endDate || null);
      const isTodayDate = isToday(date);
      const isDisabled = 
        (minDate && date < minDate) || 
        (maxDate && date > maxDate);

      days.push(
        <motion.button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isDisabled}
          className={`
            h-10 flex items-center justify-center rounded-lg text-sm font-medium
            transition-colors duration-150
            ${isSelected 
              ? "bg-blue-500 text-white" 
              : isInRangeDate 
                ? "bg-blue-500/20 text-white"
                : isTodayDate
                  ? "border-2 border-blue-500 text-white"
                  : "text-white hover:bg-white/10"
            }
            ${isDisabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
          `}
          whileHover={!isDisabled ? { scale: 1.05 } : {}}
          whileTap={!isDisabled ? { scale: 0.95 } : {}}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  return (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          onClick={previousMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>

        <div className="text-white font-semibold">
          {MONTHS[currentMonth]} {currentYear}
        </div>

        <motion.button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-xs font-semibold text-white/50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
}

// Date Picker Component with Portal
interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
  minDate,
  maxDate,
  className = "",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const formatDate = (date: Date | null) => {
    if (!date) return placeholder;
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  // Tính toán vị trí
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
  }, [isOpen]);

  // Đóng khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-calendar-content]')) {
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

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white text-left flex items-center justify-between hover:bg-white/15 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <span className={value ? "text-white" : "text-white/50"}>
          {formatDate(value)}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </motion.button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            data-calendar-content
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed z-[9999]"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              minWidth: `${position.width}px`,
            }}
          >
            <Calendar
              selectedDate={value}
              onDateSelect={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// Time Picker Component
interface TimePickerProps {
  value: { hour: number; minute: number } | null;
  onChange: (time: { hour: number; minute: number }) => void;
  className?: string;
}

export function TimePicker({ value, onChange, className = "" }: TimePickerProps) {
  const [hour, setHour] = useState(value?.hour || 0);
  const [minute, setMinute] = useState(value?.minute || 0);

  const handleHourChange = (newHour: number) => {
    setHour(newHour);
    onChange({ hour: newHour, minute });
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
    onChange({ hour, minute: newMinute });
  };

  return (
    <div className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 justify-center">
        <Clock className="w-5 h-5 text-white/70" />
        <span className="text-white font-semibold">Chọn giờ</span>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Hour Selector */}
        <div className="flex flex-col items-center gap-2">
          <motion.button
            onClick={() => handleHourChange((hour + 1) % 24)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white rotate-90" />
          </motion.button>

          <div className="w-16 h-16 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
            {hour.toString().padStart(2, "0")}
          </div>

          <motion.button
            onClick={() => handleHourChange(hour === 0 ? 23 : hour - 1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white -rotate-90" />
          </motion.button>
        </div>

        <span className="text-3xl font-bold text-white">:</span>

        {/* Minute Selector */}
        <div className="flex flex-col items-center gap-2">
          <motion.button
            onClick={() => handleMinuteChange((minute + 1) % 60)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white rotate-90" />
          </motion.button>

          <div className="w-16 h-16 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-bold text-white">
            {minute.toString().padStart(2, "0")}
          </div>

          <motion.button
            onClick={() => handleMinuteChange(minute === 0 ? 59 : minute - 1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 text-white -rotate-90" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

// DateTime Picker Component with Portal
interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "Chọn ngày và giờ",
  className = "",
}: DateTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [selectedTime, setSelectedTime] = useState({
    hour: value?.getHours() || 0,
    minute: value?.getMinutes() || 0,
  });

  const formatDateTime = (date: Date | null) => {
    if (!date) return placeholder;
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: { hour: number; minute: number }) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(selectedTime.hour, selectedTime.minute, 0, 0);
      onChange(newDate);
      setIsOpen(false);
    }
  };

  // Tính toán vị trí
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
  }, [isOpen]);

  // Đóng khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-datetime-content]')) {
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

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white text-left flex items-center justify-between hover:bg-white/15 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <span className={value ? "text-white" : "text-white/50"}>
          {formatDateTime(value)}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </motion.button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            data-datetime-content
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed z-[9999] space-y-4"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              minWidth: `${position.width}px`,
            }}
          >
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
            <TimePicker
              value={selectedTime}
              onChange={handleTimeChange}
            />
            <motion.button
              onClick={handleConfirm}
              className="w-full px-4 py-2.5 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Xác nhận
            </motion.button>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// Date Range Picker Component with Portal
interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date, end: Date | null) => void;
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  placeholder = "Chọn khoảng thời gian",
  className = "",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [currentStartMonth, setCurrentStartMonth] = useState(
    startDate ? startDate.getMonth() : new Date().getMonth()
  );
  const [currentStartYear, setCurrentStartYear] = useState(
    startDate ? startDate.getFullYear() : new Date().getFullYear()
  );

  // End calendar is 1 month ahead of start
  const currentEndMonth = currentStartMonth === 11 ? 0 : currentStartMonth + 1;
  const currentEndYear = currentStartMonth === 11 ? currentStartYear + 1 : currentStartYear;

  const formatDateRange = () => {
    if (!startDate) return placeholder;
    const start = startDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (!endDate) return `${start} - ...`;
    const end = endDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  // Tính toán vị trí
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const updatePosition = () => {
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect) {
          // Center the double calendar
          const calendarWidth = 640; // Approximate width of 2 calendars
          const leftPosition = rect.left + window.scrollX - (calendarWidth - rect.width) / 2;
          
          setPosition({
            top: rect.bottom + window.scrollY + 8,
            left: Math.max(16, leftPosition), // At least 16px from left edge
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
  }, [isOpen]);

  // Đóng khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        if (!target.closest('[data-daterange-content]')) {
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

  const handleMonthChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentStartMonth === 0) {
        setCurrentStartMonth(11);
        setCurrentStartYear(currentStartYear - 1);
      } else {
        setCurrentStartMonth(currentStartMonth - 1);
      }
    } else {
      if (currentStartMonth === 11) {
        setCurrentStartMonth(0);
        setCurrentStartYear(currentStartYear + 1);
      } else {
        setCurrentStartMonth(currentStartMonth + 1);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20 text-white text-left flex items-center justify-between hover:bg-white/15 transition-colors"
        whileTap={{ scale: 0.98 }}
      >
        <span className={startDate ? "text-white" : "text-white/50"}>
          {formatDateRange()}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-white/70 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </motion.button>

      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            data-daterange-content
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed z-[9999]"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6">
              {/* Navigation Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  onClick={() => handleMonthChange('prev')}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>

                <div className="text-white font-semibold">
                  Chọn khoảng thời gian
                </div>

                <motion.button
                  onClick={() => handleMonthChange('next')}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Double Calendar */}
              <div className="flex gap-4">
                {/* Start Date Calendar */}
                <div className="flex-1">
                  <div className="text-center mb-3">
                    <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                      Start Date
                    </span>
                  </div>
                  <RangeCalendarView
                    year={currentStartYear}
                    month={currentStartMonth}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onChange}
                  />
                </div>

                {/* End Date Calendar */}
                <div className="flex-1">
                  <div className="text-center mb-3">
                    <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                      End Date
                    </span>
                  </div>
                  <RangeCalendarView
                    year={currentEndYear}
                    month={currentEndMonth}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

// Range Calendar View Component (for double calendar)
interface RangeCalendarViewProps {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date, end: Date | null) => void;
}

function RangeCalendarView({ year, month, startDate, endDate, onChange }: RangeCalendarViewProps) {
  const [selectingEnd, setSelectingEnd] = useState(false);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      // Start new range
      onChange(clickedDate, null);
      setSelectingEnd(true);
    } else if (selectingEnd) {
      // Set end date
      if (clickedDate >= startDate) {
        onChange(startDate, clickedDate);
        setSelectingEnd(false);
      } else {
        // If clicked date is before start, swap them
        onChange(clickedDate, startDate);
        setSelectingEnd(false);
      }
    }
  };

  const renderDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      // const isSelected = isSameDay(date, startDate || null) || isSameDay(date, endDate || null);
      const isInRangeDate = isInRange(date, startDate || null, endDate || null);
      const isTodayDate = isToday(date);
      const isStart = isSameDay(date, startDate || null);
      const isEnd = isSameDay(date, endDate || null);

      days.push(
        <motion.button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            h-10 flex items-center justify-center rounded-lg text-sm font-medium
            transition-colors duration-150
            ${isStart || isEnd
              ? "bg-blue-500 text-white" 
              : isInRangeDate 
                ? "bg-blue-500/20 text-white"
                : isTodayDate
                  ? "border-2 border-blue-500 text-white"
                  : "text-white hover:bg-white/10"
            }
            cursor-pointer
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {day}
        </motion.button>
      );
    }

    return days;
  };

  return (
    <div>
      {/* Month/Year Header */}
      <div className="text-center mb-3">
        <div className="text-white font-semibold">
          {MONTHS[month]} {year}
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-xs font-semibold text-white/50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
}