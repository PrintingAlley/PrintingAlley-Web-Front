import { useTag } from 'src/hooks/useTag';
import { Box } from '@mui/material';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { Helmet } from 'react-helmet-async';
import { AdminCreateProductForm } from 'src/sections/Admin/AdminCreateProductForm';
import { useParams } from 'react-router';
import PageContainer from 'src/sections/common/PageContainer';

export default function AdminNewProductPage() {
  const { printShopId } = useParams();
  const { topLevelTags, tagHierarchies } = useTag();

  return (
    <PageContainer>
      <Helmet>
        <title>상품 등록 (관리자) | 인쇄골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="상품 등록 (관리자)" sx={{ mt: 8 }} />

      <Box sx={{ height: 16 }} />

      {printShopId && (
        <AdminCreateProductForm
          printShopId={Number(printShopId)}
          topLevelTags={topLevelTags}
          tagHierarchies={tagHierarchies}
        />
      )}
    </PageContainer>
  );
}
