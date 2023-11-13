import { Divider, Link, Stack } from '@mui/material';
import WithdrawModal from './WithdrawModal';

const SERVICE_URL = 'https://web.printingstreets.com/policy/service.html';
const PRIVACY_URL = 'https://web.printingstreets.com/policy/privacy.html';

interface Props {
  withWithDraw?: boolean;
}

export default function PolicyLink({ withWithDraw = false }: Props) {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
      <Link href={SERVICE_URL} color="text.secondary" target="_blank" variant="caption">
        이용약관
      </Link>
      <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
      <Link href={PRIVACY_URL} color="text.secondary" target="_blank" variant="overline">
        개인정보처리방침
      </Link>
      {withWithDraw && (
        <>
          <Divider orientation="vertical" flexItem sx={{ height: 12, my: 'auto' }} />
          <WithdrawModal />
        </>
      )}
    </Stack>
  );
}
