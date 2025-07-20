import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Analytics from './components/Analytics';
import Adjustments from './components/Adjustments';
import Settings from './components/Settings';
import CreateBusiness from './components/CreateBusiness';

interface Business {
  id: string;
  name: string;
  category: string;
}

const mockBusinesses: Business[] = [
  { id: '1', name: 'Elegant Hair Salon', category: 'Beauty & Wellness' },
  { id: '2', name: 'Downtown Dental Care', category: 'Healthcare' },
  { id: '3', name: 'FitLife Gym', category: 'Fitness' },
  { id: '4', name: 'Gourmet Bistro', category: 'Restaurant' },
  { id: '5', name: 'Auto Repair Pro', category: 'Automotive' },
];

function App() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [currentPage, setCurrentPage] = useState('analytics');
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);

  const handleSelectBusiness = (business: Business) => {
    setSelectedBusiness(business);
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const handleCreateBusiness = () => {
    setShowCreateBusiness(true);
  };

  const handleBackFromCreate = () => {
    setShowCreateBusiness(false);
  };

  const handleBusinessCreated = (newBusiness: Business) => {
    setBusinesses([...businesses, newBusiness]);
    setSelectedBusiness(newBusiness);
    setShowCreateBusiness(false);
    setCurrentPage('analytics');
  };

  const toggleBusinessDropdown = () => {
    setIsBusinessDropdownOpen(!isBusinessDropdownOpen);
  };

  const renderCurrentPage = () => {
    if (showCreateBusiness) {
      return (
        <CreateBusiness
          onBack={handleBackFromCreate}
          onCreateBusiness={handleBusinessCreated}
        />
      );
    }

    switch (currentPage) {
      case 'analytics':
        return <Analytics selectedBusiness={selectedBusiness} />;
      case 'adjustments':
        return <Adjustments selectedBusiness={selectedBusiness} />;
      case 'settings':
        return <Settings selectedBusiness={selectedBusiness} />;
      default:
        return <Analytics selectedBusiness={selectedBusiness} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        businesses={businesses}
        selectedBusiness={selectedBusiness}
        onSelectBusiness={handleSelectBusiness}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isBusinessDropdownOpen={isBusinessDropdownOpen}
        onToggleBusinessDropdown={toggleBusinessDropdown}
        onCreateBusiness={handleCreateBusiness}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;