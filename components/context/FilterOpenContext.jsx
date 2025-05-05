import { createContext, useState } from "react";

export const FilterOpenContext = createContext();

// Create a provider component
export const FilterOpenProvider = ({ children }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage filter open/close

  return (
    <FilterOpenContext.Provider value={{ isFilterOpen, setIsFilterOpen }}>
      {children}
    </FilterOpenContext.Provider>
  );
};
