import { Stack, Typography } from '@mui/material';

export default function NoResult() {
  return (
    <Stack justifyContent="center" alignItems="center" height={160}>
      <Typography color="text.secondary">결과가 없습니다.</Typography>
    </Stack>
  );
}
