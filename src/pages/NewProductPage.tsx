import { useTag } from 'src/hooks/useTag';
import { Box } from '@mui/material';
import { CreateProductForm } from 'src/sections/Product/CreateProductForm';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';
import { Helmet } from 'react-helmet-async';

export default function NewProductPage() {
  const { topLevelTags, tagHierarchies } = useTag();

  return (
    <div>
      <Helmet>
        <title>상품 등록 | 인쇄 골목</title>
      </Helmet>

      <NavigateBackButton />

      <Title title="상품 등록" sx={{ mt: 8 }} />

      <Box sx={{ height: 16 }} />

      <CreateProductForm topLevelTags={topLevelTags} tagHierarchies={tagHierarchies} />
    </div>
  );
}
