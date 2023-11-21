import { useMemo } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
// system
import { useRecoilValue } from 'recoil';
import { themeModeState } from 'src/state/theme-mode';
import { GlobalStyles } from '@mui/material';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const themeMode = useRecoilValue(themeModeState);

  const baseOption = useMemo(
    () => ({
      palette: palette(themeMode),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    [themeMode]
  );

  const theme = createTheme(baseOption as ThemeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          '.road-container': {
            position: 'absolute',
            top: 0,
            left: 'calc(50% - 22px)',
            width: '43px',
            height: '100vh',
            backgroundImage: 'url("/assets/about-app/road.svg")',
            backgroundRepeat: 'repeat-y',
            animation: 'moveRoad 48s linear infinite',
          },
          '@keyframes moveRoad': {
            from: { backgroundPosition: '0 0' },
            to: { backgroundPosition: '0 100%' },
          },
        }}
      />
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
