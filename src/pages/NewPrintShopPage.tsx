import { CreatePrintShopForm } from 'src/sections/PrintShop/CreatePrintShopForm';
import { Box } from '@mui/material';
import Title from 'src/sections/common/Title';
import NavigateBackButton from 'src/sections/common/NavigateBackButton';

export default function NewPrintShopPage() {
  return (
    <div>
      <NavigateBackButton />

      <Title title="인쇄사 등록" />

      <Box sx={{ height: 16 }} />

      <CreatePrintShopForm />
    </div>
  );
}
