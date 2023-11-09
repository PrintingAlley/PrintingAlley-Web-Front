import { Box, Divider, SxProps, Theme, Typography } from '@mui/material';

export default function CenteredTitle({ title, sx }: { title: string; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        my: 4,
        ...sx,
      }}
    >
      <Typography variant="h4">{title}</Typography>
      <Divider />
    </Box>
  );
}
