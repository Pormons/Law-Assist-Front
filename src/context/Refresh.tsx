// Refresh.tsx
import React, { createContext, useContext, useState } from 'react';

interface RefreshContextType {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

const RefreshProvider: React.FC = ({ children }) => {
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export { RefreshProvider, RefreshContext };
