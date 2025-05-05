import { createContext, useState } from "react";

export const ProvinceContext = createContext();

// Create a provider component
export const FilterOpenProvider = ({ children }) => {
  const [province, setProvince] = useState("ontario"); // State to manage province(ontario, calgary etc.)

  return (
    <ProvinceContext.Provider value={{ province, setProvince }}>
      {children}
    </ProvinceContext.Provider>
  );
};
