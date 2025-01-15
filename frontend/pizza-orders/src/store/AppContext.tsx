import { createContext, useState, ReactNode } from "react";

interface AppContextProps {
  openSettings: boolean;
  setOpenSettings: (open: boolean) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);


  return (
    <AppContext.Provider
      value={{
        openSettings,
        setOpenSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
