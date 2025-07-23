import React, { useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import Analytics from "./components/Analytics";
import Adjustments from "./components/Adjustments";
import Settings from "./components/Settings";
import CreateBusiness from "./components/CreateBusiness";
import { AgentContext } from "./contexts/AgentContext";

interface Business {
  id: string;
  name: string;
  category: string;
}

function App() {
  const {
    allAgents: businesses,
    agent: selectedBusiness,
    selectAgent,
  } = useContext(AgentContext);

  const [currentPage, setCurrentPage] = useState("analytics");
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [showCreateBusiness, setShowCreateBusiness] = useState(false);

  const handleSelectBusiness = (business: Business) => {
    selectAgent(business.id);
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

  const toggleBusinessDropdown = () => {
    setIsBusinessDropdownOpen(!isBusinessDropdownOpen);
  };

  const renderCurrentPage = () => {
    if (showCreateBusiness) {
      return <CreateBusiness onBack={handleBackFromCreate} />;
    }

    switch (currentPage) {
      case "analytics":
        return <Analytics selectedBusiness={selectedBusiness} />;
      case "adjustments":
        return <Adjustments selectedBusiness={selectedBusiness} />;
      case "settings":
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
      <div className="flex-1 flex flex-col">{renderCurrentPage()}</div>
    </div>
  );
}

export default App;
