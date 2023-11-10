import { Box, Typography } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

export default function CenteredTitle({ title, sx }: { title: string; sx?: SxProps<Theme> }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
        mb: 2,
        ...sx,
      }}
    >
      <Typography variant="h3" textAlign="center" fontFamily="inherit">
        {title}
      </Typography>
    </Box>
  );
}
