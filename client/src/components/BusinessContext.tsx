import React, { createContext, useState, useEffect, useContext } from "react";
import Business from "@/entities/Business.json";

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    setIsLoading(true);
    try {
      const data = await Business.list();
      setBusinesses(data);
      if (data.length > 0) {
        // Find the business that was last selected, or default to the first one.
        const lastSelectedId = localStorage.getItem("selectedBusinessId");
        const lastSelected = data.find((b) => b.id === lastSelectedId);
        setSelectedBusiness(lastSelected || data[0]);
      }
    } catch (error) {
      console.error("Error loading businesses:", error);
    }
    setIsLoading(false);
  };

  const handleBusinessChange = (business) => {
    setSelectedBusiness(business);
    localStorage.setItem("selectedBusinessId", business.id);
  };

  const value = {
    businesses,
    selectedBusiness,
    isLoading,
    handleBusinessChange,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
}
