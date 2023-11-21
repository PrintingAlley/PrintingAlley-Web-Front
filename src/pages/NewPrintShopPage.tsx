import { CreatePrintShopForm } from 'src/sections/PrintShop/CreatePrintShopForm';
import { Box } from '@mui/material';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { Helmet } from 'react-helmet-async';
import { useTag } from 'src/hooks/useTag';
import PageContainer from 'src/sections/common/PageContainer';

export default function NewPrintShopPage() {
  const { topLevelTags, tagHierarchies } = useTag();

  return (
    <PageContainer>
      <Helmet>
        <title>인쇄사 등록 | 인쇄골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="인쇄사 등록" sx={{ mt: 8 }} />

      <Box sx={{ height: 16 }} />

      <CreatePrintShopForm topLevelTags={topLevelTags} tagHierarchies={tagHierarchies} />
    </PageContainer>
  );
}
