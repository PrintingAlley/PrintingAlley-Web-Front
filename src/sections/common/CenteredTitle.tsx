import { Box, Typography } from '@mui/material';

export default function CenteredTitle({ title }: { title: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
      }}
    >
      <Typography variant="h3" textAlign="center">
        {title}
      </Typography>
    </Box>
  );
}
