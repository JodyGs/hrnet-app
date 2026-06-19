/**
 * Page de liste des employés
 * Remplace employee-list.html de l'application jQuery
 */

import React, { useEffect, useState } from 'react';
import type { Employee } from '../types/index';
import { employeeService } from '../services/employeeService';

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

  const filteredEmployees = employees.filter(emp =>
    Object.values(emp).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="container">
        <h2>Current Employees</h2>
        <button onClick={onCreateNew}>Create Employee</button>

        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%', maxWidth: '500px' }}
        />
        <p>Showing {sortedEmployees.length} of {employees.length} entries</p>

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>
                First Name {sortField === 'firstName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('lastName')} style={{ cursor: 'pointer' }}>
                Last Name {sortField === 'lastName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('startDate')} style={{ cursor: 'pointer' }}>
                Start Date {sortField === 'startDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('department')} style={{ cursor: 'pointer' }}>
                Department {sortField === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('dateOfBirth')} style={{ cursor: 'pointer' }}>
                Date of Birth {sortField === 'dateOfBirth' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('street')} style={{ cursor: 'pointer' }}>
                Street {sortField === 'street' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('city')} style={{ cursor: 'pointer' }}>
                City {sortField === 'city' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('state')} style={{ cursor: 'pointer' }}>
                State {sortField === 'state' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('zipCode')} style={{ cursor: 'pointer' }}>
                Zip Code {sortField === 'zipCode' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.startDate}</td>
                <td>{emp.department}</td>
                <td>{emp.dateOfBirth}</td>
                <td>{emp.street}</td>
                <td>{emp.city}</td>
                <td>{emp.state}</td>
                <td>{emp.zipCode}</td>
                <td>
                  <button onClick={() => handleDelete(emp.id)} style={{ padding: '0.25rem 0.5rem' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedEmployees.length === 0 && (
          <p style={{ marginTop: '1rem' }}>
            {searchTerm ? 'Aucun employé trouvé.' : 'Aucun employé enregistré.'}
          </p>
        )}

        <a href="#" onClick={onCreateNew} style={{ marginTop: '1rem', display: 'block' }}>
          Home
        </a>
      </div>
    </div>
  );
};
