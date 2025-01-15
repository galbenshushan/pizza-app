import { createContext, useState, ReactNode, useEffect } from "react";

interface AppContextProps {
  openSettings: boolean;
  setOpenSettings: (open: boolean) => void;
  isRtl: boolean;
  setIsRtl: (isRtl: boolean) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [isRtl, setIsRtl] = useState<boolean>(false);

  useEffect(() => {
    // Update the `dir` attribute when `isRtl` changes
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl]);
  return (
    <AppContext.Provider
      value={{
        openSettings,
        setOpenSettings,
        isRtl,
        setIsRtl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
