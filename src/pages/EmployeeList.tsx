/**
 * Page de liste des employés
 * Remplace employee-list.html de l'application jQuery
 */

import React, { useEffect, useState } from 'react';
import { employeeService, Employee } from '../services/employeeService';

interface EmployeeListProps {
  onCreateNew?: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ onCreateNew }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sortField, setSortField] = useState<keyof Employee>('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const data = employeeService.getAll();
    setEmployees(data);
  }, []);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(emp =>
    Object.values(emp).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sort employees
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure?')) {
      employeeService.delete(id);
      setEmployees(employeeService.getAll());
    }
  };

  const SortHeader: React.FC<{ field: keyof Employee; label: string }> = ({ field, label }) => (
    <th
      onClick={() => handleSort(field)}
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
    >
      <div className="flex items-center gap-2">
        {label}
        {sortField === field && (
          <span className="text-blue-600">{sortOrder === 'asc' ? '↑' : '↓'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center bg-blue-600 text-white py-8">
        <h1 className="text-4xl font-bold">HRnet</h1>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Employees</h2>
            <button
              onClick={onCreateNew}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Create Employee
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-2">
              Showing {sortedEmployees.length} of {employees.length} entries
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <SortHeader field="firstName" label="First Name" />
                  <SortHeader field="lastName" label="Last Name" />
                  <SortHeader field="startDate" label="Start Date" />
                  <SortHeader field="department" label="Department" />
                  <SortHeader field="dateOfBirth" label="Date of Birth" />
                  <SortHeader field="street" label="Street" />
                  <SortHeader field="city" label="City" />
                  <SortHeader field="state" label="State" />
                  <SortHeader field="zipCode" label="Zip Code" />
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.dateOfBirth}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.street}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {emp.zipCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedEmployees.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'Aucun employé trouvé.' : 'Aucun employé enregistré.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
