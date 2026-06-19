/**
 * Page de création d'un nouvel employé
 * Remplace index.html de l'application jQuery
 */

import React, { useState } from 'react';
import type { Employee } from '../types/index';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { employeeService } from '../services/employeeService';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (field: 'dateOfBirth' | 'startDate') => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    employeeService.add(formData);
    setShowConfirm(true);

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

    setTimeout(() => {
      setShowConfirm(false);
      onSuccess?.();
    }, 2000);
  };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        <button onClick={onViewEmployees} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          View Current Employees
        </button>

        <h2>Create Employee</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleDateChange('dateOfBirth')}
            format="MM/DD/YYYY"
            placeholder="MM/DD/YYYY"
          />

          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            value={formData.startDate}
            onChange={handleDateChange('startDate')}
            format="MM/DD/YYYY"
            placeholder="MM/DD/YYYY"
          />

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />

            <label htmlFor="state">State</label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map(state => (
                <option key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </option>
              ))}
            </select>

            <label htmlFor="zipCode">Zip Code</label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </fieldset>

          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>

          <button type="submit">Save</button>
        </form>
      </div>

      {showConfirm && (
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      )}
    </div>
  );
};
