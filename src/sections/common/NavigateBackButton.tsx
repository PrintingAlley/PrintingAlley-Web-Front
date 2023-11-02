import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';

export default function NavigateBackButton() {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={handleNavigateBack}>
      <Iconify icon="ic:round-arrow-back" />
    </IconButton>
  );
}
