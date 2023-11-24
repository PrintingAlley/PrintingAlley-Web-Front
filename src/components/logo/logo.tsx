import { forwardRef } from 'react';

import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';

import { Link as RouterLink } from 'react-router-dom';
import { paths } from 'src/routes/path';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  white?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, white = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        component="img"
        src={white ? '/logo/logo-white.svg' : '/logo/logo.svg'}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1.5,
          cursor: 'pointer',
          WebkitUserDrag: 'none',
          padding: white ? 1 : 0,
          ...sx,
        }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} to={paths.root} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
