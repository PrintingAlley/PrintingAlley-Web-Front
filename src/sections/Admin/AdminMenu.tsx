import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';

export default function AdminMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        어드민 메뉴
      </Typography>
      <Box>
        <Button onClick={() => navigate('/content/new')} variant="soft" color="info">
          콘텐츠 작성 페이지
        </Button>
      </Box>
    </>
  );
}
