import { Box, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';

export default function NavigateBackButton() {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title="뒤로가기">
        <IconButton onClick={handleNavigateBack} sx={{ position: 'absolute', left: 0, top: 4 }}>
          <Iconify icon="ic:round-arrow-back" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
