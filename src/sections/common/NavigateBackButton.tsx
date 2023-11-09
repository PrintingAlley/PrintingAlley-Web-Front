import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import Iconify from 'src/components/iconify';

export default function NavigateBackButton() {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' } }}>
      <Button
        variant="soft"
        onClick={handleNavigateBack}
        sx={{ position: 'absolute', left: -160 }}
        startIcon={<Iconify icon="ic:round-keyboard-arrow-left" />}
      >
        뒤로가기
      </Button>
    </Box>
  );
}
