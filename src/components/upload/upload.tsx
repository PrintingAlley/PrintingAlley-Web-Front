import { useDropzone } from 'react-dropzone';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Iconify from '../iconify';
import { UploadProps } from './types';
import MultiFilePreview from './preview-multi-file';
import RejectionFiles from './errors-rejection-files';
import SingleFilePreview from './preview-single-file';

// ----------------------------------------------------------------------

export default function Upload({
  disabled,
  multiple = false,
  error,
  helperText,
  //
  file,
  onDelete,
  //
  files,
  thumbnail,
  onUpload,
  onRemove,
  onRemoveAll,
  sx,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    disabled,
    ...other,
  });

  const hasFile = !!file && !multiple;

  const hasFiles = !!files && multiple && !!files.length;

  const hasError = isDragReject || !!error;

  const renderPlaceholder = (
    <Stack spacing={0.5} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
        <Iconify icon="ic:baseline-cloud-upload" />
        <Typography variant="h6">이미지를 드래그하거나 선택하세요.</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        이미지를 드래그해서 넣거나
        <Box
          component="span"
          sx={{
            mx: 0.5,
            color: 'primary.main',
            textDecoration: 'underline',
          }}
        >
          클릭하여
        </Box>
        선택하세요.
      </Typography>
    </Stack>
  );

  const renderSinglePreview = (
    <SingleFilePreview imgUrl={typeof file === 'string' ? file : file?.preview} />
  );

  const removeSinglePreview = hasFile && onDelete && (
    <IconButton
      size="small"
      onClick={onDelete}
      sx={{
        top: 16,
        right: 16,
        zIndex: 9,
        position: 'absolute',
        color: (theme) => alpha(theme.palette.common.white, 0.8),
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
        '&:hover': {
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
        },
      }}
    >
      <Iconify icon="mingcute:close-line" width={18} />
    </IconButton>
  );

  const renderMultiPreview = hasFiles && (
    <>
      <Box sx={{ my: 3 }}>
        <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
      </Box>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        {onRemoveAll && (
          <Button color="inherit" variant="outlined" size="small" onClick={onRemoveAll}>
            모두 삭제
          </Button>
        )}

        {onUpload && (
          <Button
            size="small"
            variant="contained"
            onClick={onUpload}
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          >
            업로드
          </Button>
        )}
      </Stack>
    </>
  );

  return (
    <Box sx={{ width: 1, position: 'relative', ...sx }}>
      <Box
        {...getRootProps()}
        sx={{
          p: 4,
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
          ...(isDragActive && {
            opacity: 0.72,
          }),
          ...(disabled && {
            opacity: 0.48,
            pointerEvents: 'none',
          }),
          ...(hasError && {
            color: 'error.main',
            borderColor: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
          }),
          ...(hasFile && {
            padding: '24% 0',
          }),
        }}
      >
        <input {...getInputProps()} />

        {hasFile ? renderSinglePreview : renderPlaceholder}
      </Box>

      {removeSinglePreview}

      {helperText && helperText}

      <RejectionFiles fileRejections={fileRejections} />

      {renderMultiPreview}
    </Box>
  );
}
