import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import PageContainer from 'src/sections/common/PageContainer';
import Title from 'src/sections/common/Title';
import { CreateContentForm } from 'src/sections/Content/CreateContentForm';

export default function NewContentPage() {
  return (
    <PageContainer>
      <Helmet>
        <title>콘텐츠 작성 | 인쇄골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="콘텐츠 작성" sx={{ mt: 8 }} />

      <Box sx={{ height: 16 }} />

      <CreateContentForm />
    </PageContainer>
  );
}
