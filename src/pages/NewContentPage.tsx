import { Box } from '@mui/material';
import Title from 'src/sections/common/Title';
import { CreateContentForm } from 'src/sections/Content/CreateContentForm';

export default function NewContentPage() {
  return (
    <div>
      <Title title="콘텐츠 작성" />
      <Box sx={{ height: 16 }} />
      <CreateContentForm />
    </div>
  );
}
