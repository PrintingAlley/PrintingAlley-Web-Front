import { useTag } from 'src/hooks/useTag';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { Box } from '@mui/material';
import { CreateProductForm } from 'src/sections/Product/CreateProductForm';

export default function NewProductPage() {
  const { topLevelTags, tagHierarchies } = useTag();

  return (
    <div>
      <CenteredTitle title="제품 등록 페이지" />
      <Box sx={{ height: '16px' }} />
      <CreateProductForm topLevelTags={topLevelTags} tagHierarchies={tagHierarchies} />
    </div>
  );
}
