import { Box, Stack, Typography, alpha, styled } from '@mui/material';
import Iconify from 'src/components/iconify';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const FilesUploadButton = ({
  onChange,
  children,
  disabled,
  error,
}: {
  onChange: any;
  children: React.ReactNode;
  disabled?: boolean;
  error?: string;
}) => (
  <Box
    component="label"
    sx={{
      p: 3,
      outline: 'none',
      borderRadius: 1,
      cursor: 'pointer',
      overflow: 'hidden',
      position: 'relative',
      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
      border: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
      transition: (theme) => theme.transitions.create(['opacity', 'padding']),
      '&:hover': {
        opacity: 0.72,
      },
      ...(disabled && {
        opacity: 0.48,
        pointerEvents: 'none',
      }),
      ...(error && {
        color: 'error.main',
        borderColor: 'error.main',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }),
    }}
  >
    <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={onChange} />

    <Stack spacing={0.5} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Iconify icon="ic:baseline-cloud-upload" />
        <Typography variant="h6">이미지를 업로드하세요.</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {children}
      </Typography>
    </Stack>
  </Box>
);
