/**
 * Composant DatePicker réutilisable en React
 * Remplace le plugin jQuery dateTimePicker
 */

import React, { useState } from 'react';
import './DatePicker.css';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  id?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  format = 'MM/DD/YYYY',
  placeholder = 'MM/DD/YYYY',
  label,
  disabled = false,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (date: Date, fmt: string): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return fmt === 'MM/DD/YYYY' ? `${month}/${day}/${year}` : `${year}-${month}-${day}`;
  };

  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    if (format === 'MM/DD/YYYY') {
      const [month, day, year] = dateStr.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      return new Date(dateStr);
    }
  };

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    return days;
  };

  const handleDayClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formatted = formatDate(date, format);
    onChange(formatted);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const days = getDaysInMonth(currentMonth);
  const monthYear = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="date-picker-container">
      {label && <label className="date-picker-label">{label}</label>}

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="date-picker-input"
      />

      {isOpen && !disabled && (
        <div className="date-picker-dropdown">
          <div className="date-picker-header">
            <button onClick={handlePrevMonth} className="date-picker-nav-btn">←</button>
            <h3>{monthYear}</h3>
            <button onClick={handleNextMonth} className="date-picker-nav-btn">→</button>
          </div>

          <div className="date-picker-calendar">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="date-picker-day-header">{day[0]}</div>
            ))}
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && handleDayClick(day)}
                disabled={!day}
                className={`date-picker-day ${!day ? 'disabled' : ''} ${
                  value && parseDate(value)?.getDate() === day ? 'selected' : ''
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <button onClick={() => setIsOpen(false)} className="date-picker-close-btn">
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};
