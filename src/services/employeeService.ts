/**
 * Service pour gérer les employés via localStorage
 */

import type { Employee } from '../types/index';

export type { Employee } from '../types/index';

const STORAGE_KEY = 'hrnet_employees';

export const employeeService = {
  /**
   * Récupère tous les employés depuis localStorage
   */
  getAll: (): Employee[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Ajoute un nouvel employé
   */
  add: (employee: Omit<Employee, 'id'>): Employee => {
    const employees = employeeService.getAll();
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return newEmployee;
  },

  /**
   * Supprime un employé par ID
   */
  delete: (id: string): void => {
    const employees = employeeService.getAll();
    const filtered = employees.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  /**
   * Réinitialise les employés
   */
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
