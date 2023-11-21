// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// ----------------------------------------------------------------------

// theme
import ThemeProvider from 'src/theme';
// components
import ProgressBar from 'src/components/progress-bar';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { MotionLazy } from './components/animate/motion-lazy';
import Router from './routes';
import ScrollToTopButton from './sections/common/ScrollToTopButton';
import { LocalizationProvider } from './locales';
import { useScrollToTop } from './hooks/useScrollToTop';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider>
      <ThemeProvider>
        <MotionLazy>
          <SnackbarProvider>
            <ProgressBar />
            <Router />
            <ScrollToTopButton />
          </SnackbarProvider>
        </MotionLazy>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
