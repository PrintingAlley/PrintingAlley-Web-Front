import { Stack, IconButton, Typography, Tooltip } from '@mui/material';
import Iconify from 'src/components/iconify';
import KakaoShareButton from 'src/sections/common/KakaoShareButton';
import { PrintShopDetail, PrintShopReviewWithUser } from 'src/types/response.dto';

interface PrintShopActionsProps {
  printShop: PrintShopDetail;
  reviews: PrintShopReviewWithUser[] | null;
  isAuthenticated: boolean;
  onReviewScroll: () => void;
  fetchPrintShop: () => void;
}

const PrintShopActions = ({
  printShop,
  reviews,
  isAuthenticated,
  onReviewScroll,
  fetchPrintShop,
}: PrintShopActionsProps) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="flex-end"
    spacing={1}
    sx={{ svg: { width: 24, height: 24 } }}
  >
    <Stack direction="row" alignItems="center">
      <IconButton disabled>
        <Iconify icon="mdi:eye" />
      </IconButton>
      <Typography variant="subtitle2" color="text.secondary">
        {printShop.viewCount}
      </Typography>
    </Stack>
    {/* TODO: 인쇄사 북마크 */}
    {/* <Stack direction="row" alignItems="center">
      {isAuthenticated ? (
        <BookmarkModal printShop={printShop} fetchPrintShop={fetchPrintShop} />
      ) : (
        <LoginModal iconButton bookmarkIcon />
      )}
      <Typography variant="subtitle2" color="text.secondary">
        {printShop.bookmarkCount}
      </Typography>
    </Stack> */}
    <Stack direction="row" alignItems="center">
      <Tooltip title="리뷰로 이동">
        <IconButton color="info" onClick={onReviewScroll}>
          <Iconify icon="mdi:comment-text-outline" />
        </IconButton>
      </Tooltip>
      <Typography variant="subtitle2" color="text.secondary">
        {reviews?.length}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center">
      <KakaoShareButton printShopDetail={printShop} />
    </Stack>
  </Stack>
);

export default PrintShopActions;
