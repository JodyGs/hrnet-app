/**
 * Composant principal de l'application HRnet
 * Gère le routage entre la page de création et la liste des employés
 */

import React, { useState } from 'react';
import { CreateEmployee } from './pages/CreateEmployee';
import { EmployeeList } from './pages/EmployeeList';

type PageType = 'create' | 'list';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('create');

  const handleViewEmployees = () => setCurrentPage('list');
  const handleCreateNew = () => setCurrentPage('create');

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'create' && (
        <CreateEmployee
          onViewEmployees={handleViewEmployees}
          onSuccess={() => {}}
        />
      )}
      {currentPage === 'list' && (
        <EmployeeList onCreateNew={handleCreateNew} />
      )}
    </div>
  );
}

export default App;
