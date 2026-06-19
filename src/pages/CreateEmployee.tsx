/**
 * Page de création d'un nouvel employé
 * Remplace index.html de l'application jQuery
 */

import React, { useState } from 'react';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { employeeService, Employee } from '../services/employeeService';
import { states } from '../data/states';

interface FormData extends Omit<Employee, 'id'> {}

interface CreateEmployeeProps {
  onSuccess?: () => void;
  onViewEmployees?: () => void;
}

export const CreateEmployee: React.FC<CreateEmployeeProps> = ({ onSuccess, onViewEmployees }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const [showConfirm, setShowConfirm] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle date changes
  const handleDateChange = (field: 'dateOfBirth' | 'startDate') => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!formData.firstName || !formData.lastName) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    employeeService.add(formData);
    setShowConfirm(true);

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales',
    });

    // Close confirmation after 2s
    setTimeout(() => {
      setShowConfirm(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center bg-blue-600 text-white py-8">
        <h1 className="text-4xl font-bold">HRnet</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-2xl px-4">
          <button
            onClick={onViewEmployees}
            className="text-blue-600 hover:underline mb-6 inline-block font-medium"
          >
            View Current Employees
          </button>

          <h2 className="text-2xl font-bold mb-6">Create Employee</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <DatePicker
                id="dateOfBirth"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleDateChange('dateOfBirth')}
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
              />
            </div>

            {/* Start Date */}
            <div>
              <DatePicker
                id="startDate"
                label="Start Date"
                value={formData.startDate}
                onChange={handleDateChange('startDate')}
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
              />
            </div>

            {/* Address Section */}
            <fieldset className="border border-gray-300 rounded-md p-4">
              <legend className="text-lg font-semibold px-2">Address</legend>

              <div className="space-y-4">
                {/* Street */}
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map(state => (
                      <option key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zip Code */}
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </fieldset>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-lg font-semibold text-gray-800">Employee Created!</p>
          </div>
        </div>
      )}
    </div>
  );
};
