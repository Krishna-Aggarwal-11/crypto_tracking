import { createContext, useState } from "react";

export const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>
        <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
