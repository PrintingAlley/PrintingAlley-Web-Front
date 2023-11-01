import { Button, styled } from '@mui/material';
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
}: {
  onChange: any;
  children: React.ReactNode;
}) => (
  <Button
    component="label"
    variant="outlined"
    color="primary"
    startIcon={<Iconify icon="ic:baseline-cloud-upload" />}
  >
    {children}
    <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={onChange} />
  </Button>
);
