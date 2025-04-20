import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeCreator } from './base';
import { getLocalStorage, setLocalStorage } from '../utils/helper';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const curThemeName = getLocalStorage('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);

  const setThemeName = (themeName: string): void => {
    setLocalStorage('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
