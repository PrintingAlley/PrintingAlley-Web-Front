import { CreatePrintShopForm } from 'src/sections/PrintShop/CreatePrintShopForm';
import { useTopLevelTags } from 'src/hooks/useTopLevelTags';
import CenteredTitle from 'src/sections/common/CenteredTitle';
import { Box } from '@mui/material';

export default function NewPrintShopPage() {
  const { topLevelTags, tagHierarchies } = useTopLevelTags();

  return (
    <div>
      <CenteredTitle title="인쇄사 등록 페이지" />
      <Box sx={{ height: '16px' }} />
      <CreatePrintShopForm topLevelTags={topLevelTags} tagHierarchies={tagHierarchies} />
    </div>
  );
}
