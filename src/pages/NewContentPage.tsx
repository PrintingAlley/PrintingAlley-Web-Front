import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import Title from 'src/sections/common/Title';
import { CreateContentForm } from 'src/sections/Content/CreateContentForm';

export default function NewContentPage() {
  return (
    <div>
      <Helmet>
        <title>콘텐츠 작성 | 인쇄 골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="콘텐츠 작성" />

      <Box sx={{ height: 16 }} />

      <CreateContentForm />
    </div>
  );
}
