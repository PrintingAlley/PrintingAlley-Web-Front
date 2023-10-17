// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
// components
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import Home from './pages/Home';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <ProgressBar />
        <Home />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
