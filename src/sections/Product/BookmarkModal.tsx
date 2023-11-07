import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import {
  BookmarkGroupWithHasProduct,
  GetBookmarkGroupsWithHasProductResponse,
  ProductDetail,
} from 'src/types/response.dto';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import CreateBookmarkDialog from '../Bookmark/CreateBookmarkDialog';
import UpdateBookmarkDialog from '../Bookmark/UpdateBookmarkDialog';

interface Props {
  product: ProductDetail;
  fetchProduct: () => void;
}

export default function BookmarkModal({ product, fetchProduct }: Props) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [bookmarkGroups, setBookmarkGroups] = useState<BookmarkGroupWithHasProduct[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigateToBookmark = () => {
    navigate('/bookmark');
  };

  const fetchBookmarkGroups = () => {
    axios
      .get<GetBookmarkGroupsWithHasProductResponse>(`/bookmark/group/has-product/${product.id}`)
      .then((response) => {
        setBookmarkGroups(response.data.bookmarkGroups);
      });
  };

  const fetchPageData = () => {
    fetchBookmarkGroups();
    fetchProduct();
  };

  const addBookmark = (bookmarkGroup: BookmarkGroupWithHasProduct) => {
    axios
      .post('/bookmark', {
        groupId: bookmarkGroup.id,
        productId: product.id,
      })
      .then(() => {
        enqueueSnackbar(`${bookmarkGroup.name}에 북마크가 추가되었습니다.`, { variant: 'success' });
        fetchPageData();
      })
      .catch((error) => {
        enqueueSnackbar(`북마크 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const addBookmarkToDefaultGroup = () => {
    axios
      .post('/bookmark', {
        productId: product.id,
      })
      .then(() => {
        enqueueSnackbar(`기본 그룹에 북마크가 추가되었습니다.`, { variant: 'success' });
        fetchPageData();
      })
      .catch((error) => {
        enqueueSnackbar(`북마크 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const removeBookmark = (bookmarkGroup: BookmarkGroupWithHasProduct) => {
    const { bookmarkId } = bookmarkGroup;
    if (bookmarkId === null) {
      return;
    }

    axios
      .delete(`/bookmark/${bookmarkId}`)
      .then(() => {
        enqueueSnackbar(`${bookmarkGroup.name}에서 북마크가 해제되었습니다.`, {
          variant: 'success',
        });
        fetchPageData();
      })
      .catch((error) => {
        enqueueSnackbar(`북마크 해제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    fetchBookmarkGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
        <IconButton color="primary" onClick={handleOpen}>
          {product.isBookmarked ? (
            <Iconify icon="mdi:bookmark" />
          ) : (
            <Iconify icon="mdi:bookmark-outline" />
          )}
        </IconButton>
        <Link component="button" onClick={handleOpen}>
          {product.isBookmarked ? '다른 그룹에 북마크 추가하기' : '북마크 추가하기'}
        </Link>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          북마크 관리
          <Button
            onClick={navigateToBookmark}
            variant="soft"
            color="primary"
            sx={{ float: 'right' }}
          >
            북마크 페이지로 이동
          </Button>
        </DialogTitle>
        <DialogContent sx={{ width: 400, maxWidth: 1 }}>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ minHeight: 200, maxHeight: 400 }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>그룹 이름</TableCell>
                  <TableCell align="center" width={80}>
                    북마크
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookmarkGroups.length ? (
                  bookmarkGroups.map((bookmarkGroup) => (
                    <TableRow key={bookmarkGroup.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {bookmarkGroup.name}
                          <UpdateBookmarkDialog
                            bookmarkGroup={bookmarkGroup}
                            onUpdate={fetchBookmarkGroups}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {bookmarkGroup.hasProduct ? (
                          <IconButton color="primary" onClick={() => removeBookmark(bookmarkGroup)}>
                            <Iconify icon="mdi:bookmark" />
                          </IconButton>
                        ) : (
                          <IconButton color="primary" onClick={() => addBookmark(bookmarkGroup)}>
                            <Iconify icon="mdi:bookmark-outline" />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ color: 'text.disabled', p: 4 }}>
                      <Stack spacing={1}>
                        북마크 그룹이 없습니다.
                        <Box>
                          <Button
                            onClick={addBookmarkToDefaultGroup}
                            variant="contained"
                            color="primary"
                          >
                            기본 그룹에 추가하기
                          </Button>
                        </Box>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <CreateBookmarkDialog onAdd={fetchBookmarkGroups} />
          <Button onClick={handleClose} variant="outlined" color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
