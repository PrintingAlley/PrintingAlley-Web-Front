import { Stack, IconButton, Typography, Tooltip } from '@mui/material';
import Iconify from 'src/components/iconify';
import BookmarkModal from 'src/sections/Product/BookmarkModal';
import LoginModal from 'src/sections/Login/LoginModal';
import KakaoShareButton from 'src/sections/common/KakaoShareButton';
import { ProductDetail } from 'src/types/response.dto';

interface ProductActionsProps {
  product: ProductDetail;
  isAuthenticated: boolean;
  onReviewScroll: () => void;
  fetchProduct: () => void;
}

const ProductActions = ({
  product,
  isAuthenticated,
  onReviewScroll,
  fetchProduct,
}: ProductActionsProps) => (
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
        {product.viewCount}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center">
      {isAuthenticated ? (
        <BookmarkModal product={product} fetchProduct={fetchProduct} />
      ) : (
        <LoginModal iconButton bookmarkIcon />
      )}
      <Typography variant="subtitle2" color="text.secondary">
        {product.bookmarkCount}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center">
      <Tooltip title="리뷰로 이동">
        <IconButton color="info" onClick={onReviewScroll}>
          <Iconify icon="mdi:comment-text-outline" />
        </IconButton>
      </Tooltip>
      <Typography variant="subtitle2" color="text.secondary">
        {product.reviews.length}
      </Typography>
    </Stack>
    <Stack direction="row" alignItems="center">
      <KakaoShareButton productDetail={product} />
    </Stack>
  </Stack>
);

export default ProductActions;
