/**
 * Composant DatePicker réutilisable en React
 * Remplace le plugin jQuery dateTimePicker
 *
 * Props:
 * - value: string (format 'YYYY-MM-DD' ou 'MM/DD/YYYY')
 * - onChange: (value: string) => void
 * - format: 'MM/DD/YYYY' | 'YYYY-MM-DD' (défaut: 'MM/DD/YYYY')
 * - placeholder: string
 * - label: string (optionnel)
 * - disabled: boolean (optionnel)
 */

import React, { useState } from 'react';

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

  // Convertit string date en format souhaité
  const formatDate = (date: Date, fmt: string): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return fmt === 'MM/DD/YYYY' ? `${month}/${day}/${year}` : `${year}-${month}-${day}`;
  };

  // Parse une date string
  const parseDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    if (format === 'MM/DD/YYYY') {
      const [month, day, year] = dateStr.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
      return new Date(dateStr);
    }
  };

  // Génère les jours du mois
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
    <div className="relative w-full">
      {label && <label className="block text-sm font-medium mb-2">{label}</label>}

      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 cursor-pointer"
      />

      {isOpen && !disabled && (
        <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <h3 className="text-sm font-semibold">{monthYear}</h3>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-semibold text-gray-600 w-6 h-6">
                {day[0]}
              </div>
            ))}
            {days.map((day, idx) => (
              <button
                key={idx}
                onClick={() => day && handleDayClick(day)}
                disabled={!day}
                className={`w-6 h-6 text-xs rounded hover:bg-blue-100 ${
                  !day ? 'invisible' : 'cursor-pointer hover:bg-blue-500 hover:text-white'
                } ${
                  value && parseDate(value)?.getDate() === day
                    ? 'bg-blue-500 text-white'
                    : ''
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};
