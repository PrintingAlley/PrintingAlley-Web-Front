import { Box, Divider, Typography } from '@mui/material';

export default function Title({ title }: { title: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        my: 4,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Divider />
    </Box>
  );
}
