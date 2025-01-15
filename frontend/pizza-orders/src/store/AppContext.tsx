import { createContext, useState, ReactNode, useEffect } from "react";
import { texts } from "../consts/texts";

interface AppContextProps {
  openSettings: boolean;
  setOpenSettings: (open: boolean) => void;
  isRtl: boolean;
  setIsRtl: (isRtl: boolean) => void;
  getText: (key: string) => string;
  processText: (text: string) => string;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [isRtl, setIsRtl] = useState<boolean>(false);

  const getText = (key: string): string => {
    const language = isRtl ? "heb" : "en";
    return texts[language][key] || "";
  };

  const processText = (text: string) => {
    return text
      .replace(/,/g, " ,")
      .split(" ")
      .map((word) => {
        if (!isNaN(Number(word))) {
          return word;
        }
        return getText(word);
      })
      .join(" ");
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
  }, [isRtl]);

  return (
    <AppContext.Provider
      value={{
        openSettings,
        setOpenSettings,
        isRtl,
        setIsRtl,
        getText,
        processText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
