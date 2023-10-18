import { ReactNode } from 'react';
import { Container } from '@mui/material';

export default function PageContainer({ children }: { children: ReactNode }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 1,
        py: { xs: 7, sm: 8 },
      }}
    >
      {children}
    </Container>
  );
}
