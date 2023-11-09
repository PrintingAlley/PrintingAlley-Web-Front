import { useTag } from 'src/hooks/useTag';
import { Box } from '@mui/material';
import { CreateProductForm } from 'src/sections/Product/CreateProductForm';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';

export default function NewProductPage() {
  const { topLevelTags, tagHierarchies } = useTag();

  return (
    <div>
      <NavigateBackButton />

      <Title title="상품 등록" />

      <Box sx={{ height: 16 }} />

      <CreateProductForm topLevelTags={topLevelTags} tagHierarchies={tagHierarchies} />
    </div>
  );
}
