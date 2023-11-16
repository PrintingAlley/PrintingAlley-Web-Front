import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography,
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
      <Tooltip title={product.isBookmarked ? '북마크 관리' : '북마크 추가하기'}>
        <IconButton color="primary" onClick={handleOpen}>
          <Iconify icon={product.isBookmarked ? 'mdi:bookmark' : 'mdi:bookmark-outline'} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          북마크 관리
          <Button
            onClick={navigateToBookmark}
            variant="soft"
            color="primary"
            endIcon={<Iconify icon="ic:round-keyboard-arrow-right" />}
          >
            북마크 페이지로 이동
          </Button>
        </DialogTitle>
        <DialogContent
          sx={{
            width: 400,
            maxWidth: 1,
            minHeight: 200,
            maxHeight: 400,
            display: 'flex',
          }}
        >
          {bookmarkGroups.length ? (
            <List
              component={Paper}
              variant="outlined"
              sx={{
                '& .MuiListItem-root:not(:last-of-type)': {
                  borderBottom: '1px dashed',
                  borderColor: 'divider',
                },
                width: 1,
                overflow: 'auto',
              }}
              disablePadding
            >
              {bookmarkGroups.map((bookmarkGroup) => (
                <ListItem
                  key={bookmarkGroup.id}
                  secondaryAction={
                    bookmarkGroup.hasProduct ? (
                      <Tooltip title="북마크 해제">
                        <IconButton color="primary" onClick={() => removeBookmark(bookmarkGroup)}>
                          <Iconify icon="mdi:bookmark" />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="북마크 추가">
                        <IconButton color="primary" onClick={() => addBookmark(bookmarkGroup)}>
                          <Iconify icon="mdi:bookmark-outline" />
                        </IconButton>
                      </Tooltip>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Logo"
                      src={bookmarkGroup.recentImage || '/assets/images/placeholder.svg'}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={bookmarkGroup.name}
                    secondary={`${bookmarkGroup.bookmarkCount}개의 북마크`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Stack gap={1} justifyContent="center" alignItems="center" width={1}>
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                북마크 그룹이 없습니다.
              </Typography>
              <Button
                onClick={addBookmarkToDefaultGroup}
                variant="contained"
                color="primary"
                endIcon={<Iconify icon="mdi:bookmark-outline" />}
              >
                기본 그룹에 추가하기
              </Button>
            </Stack>
          )}
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
