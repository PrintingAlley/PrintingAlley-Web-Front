import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import { paths } from 'src/routes/path';

export default function AdminMenu() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        어드민 메뉴
      </Typography>
      <Box>
        <Button onClick={() => navigate(paths.content.new)} variant="soft" color="info">
          콘텐츠 작성 페이지
        </Button>
      </Box>
    </>
  );
}
