import { CreatePrintShopForm } from 'src/sections/PrintShop/CreatePrintShopForm';
import { useNavigate } from 'react-router';
import { useTopLevelTags } from 'src/hooks/useTopLevelTags';
import CenteredTitle from 'src/sections/common/CenteredTitle';

export default function NewPrintShopPage() {
  const navigate = useNavigate();
  const { topLevelTags, tagHierarchies } = useTopLevelTags();
  const handleAddSuccess = () => {
    navigate('/print-shop', { replace: true });
  };

  return (
    <div>
      <CenteredTitle title="인쇄사 등록" />
      <CreatePrintShopForm
        topLevelTags={topLevelTags}
        tagHierarchies={tagHierarchies}
        onAddSuccess={handleAddSuccess}
      />
    </div>
  );
}
