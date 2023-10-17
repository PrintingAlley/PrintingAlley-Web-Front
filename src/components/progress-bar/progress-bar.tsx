import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
//
import StyledProgressBar from './styles';

// ----------------------------------------------------------------------

export default function ProgressBar() {
  const [mounted, setMounted] = useState(false);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!visible) {
      NProgress.start();
      setVisible(true);
    }

    if (visible) {
      NProgress.done();
      setVisible(false);
    }

    if (!visible && mounted) {
      setVisible(false);
      NProgress.done();
    }

    return () => {
      NProgress.done();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return <StyledProgressBar />;
}
