import {
  Typography,
  Stack,
  Button,
  Checkbox as MuiCheckbox,
  Box,
  alpha,
  Theme,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Masonry from '@mui/lab/Masonry';
import {
  BookmarkGroupDetail,
  BookmarkGroupWithExtra,
  GetBookmarkGroupResponse,
} from 'src/types/response.dto';
import Image from 'src/components/image';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { useNavigate } from 'react-router';
import { useSnackbar } from 'notistack';
import CreateBookmarkDialog from './CreateBookmarkDialog';
import UpdateBookmarkDialog from './UpdateBookmarkDialog';

const checkboxWrapperStyle = (theme: Theme) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.grey[900], 0.2),
  borderRadius: '50%',
  width: 36,
  height: 36,
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[900], 0.4),
  },
});

const checkboxStyle = {
  '&.Mui-checked': {
    color: 'primary.main',
    mr: 0,
  },
  color: 'primary.contrastText',
  mr: 0.1,
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: CheckboxProps) => (
  <Box sx={checkboxWrapperStyle}>
    <MuiCheckbox {...props} sx={checkboxStyle} />
  </Box>
);

interface BookmarkGroupListProps {
  bookmarkGroups: BookmarkGroupWithExtra[];
  fetchBookmarkGroups: () => void;
}

export const BookmarkGroupList = ({
  bookmarkGroups,
  fetchBookmarkGroups,
}: BookmarkGroupListProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [currentGroup, setCurrentGroup] = useState<BookmarkGroupDetail | null>(null);

  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);

  const fetchBookmarkGroup = (id: number) => {
    axios.get<GetBookmarkGroupResponse>(`/bookmark/group/${id}`).then((response) => {
      setCurrentGroup(response.data.bookmarkGroup);
    });
  };

  const onBookmarkGroupClick = (bookmarkGroupId: number) => {
    fetchBookmarkGroup(bookmarkGroupId);
  };

  const resetCurrentGroup = () => {
    setCurrentGroup(null);
  };

  const goToProductPage = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleSelectGroup = (groupId: number) => {
    setSelectedGroups(
      selectedGroups.includes(groupId)
        ? selectedGroups.filter((id) => id !== groupId)
        : [...selectedGroups, groupId]
    );
  };

  const handleSelectBookmark = (bookmarkId: number) => {
    setSelectedBookmarks(
      selectedBookmarks.includes(bookmarkId)
        ? selectedBookmarks.filter((id) => id !== bookmarkId)
        : [...selectedBookmarks, bookmarkId]
    );
  };

  const isSelectAllGroups =
    bookmarkGroups.length && selectedGroups.length === bookmarkGroups.length;
  const isSelectAllBookmarks =
    currentGroup?.bookmarks.length && selectedBookmarks.length === currentGroup?.bookmarks.length;

  const toggleSelectAllGroups = () => {
    if (isSelectAllGroups) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(bookmarkGroups.map((group) => group.id));
    }
  };

  const toggleSelectAllBookmarks = () => {
    if (isSelectAllBookmarks) {
      setSelectedBookmarks([]);
    } else {
      setSelectedBookmarks(currentGroup?.bookmarks.map((bookmark) => bookmark.id) || []);
    }
  };

  const deleteSelectedGroups = () => {
    if (!window.confirm('선택한 그룹을 삭제하시겠습니까?')) return;
    axios
      .delete(`/bookmark/groups`, { data: { groupIds: selectedGroups } })
      .then(() => {
        enqueueSnackbar('그룹이 성공적으로 삭제되었습니다.', { variant: 'success' });
        fetchPageData();
      })
      .catch((error) => {
        enqueueSnackbar(`그룹 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const deleteSelectedBookmarks = () => {
    if (!window.confirm('선택한 북마크를 삭제하시겠습니까?')) return;
    axios
      .delete(`/bookmark/batch`, { data: { bookmarkIds: selectedBookmarks } })
      .then(() => {
        enqueueSnackbar('북마크가 성공적으로 삭제되었습니다.', { variant: 'success' });
        fetchPageData();
      })
      .catch((error) => {
        enqueueSnackbar(`북마크 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const fetchPageData = () => {
    fetchBookmarkGroups();
    if (currentGroup) {
      fetchBookmarkGroup(currentGroup.id);
    }
  };

  useEffect(() => {
    if (bookmarkGroups) {
      setSelectedGroups([]);
    }
  }, [bookmarkGroups]);

  useEffect(() => {
    if (currentGroup) {
      setSelectedBookmarks([]);
    }
  }, [currentGroup]);

  return (
    <>
      <Stack spacing={3} sx={{ display: currentGroup ? 'none' : 'flex' }}>
        <Stack spacing={2} sx={{ whiteSpace: 'pre-wrap' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <CreateBookmarkDialog onAdd={fetchBookmarkGroups} />
            <Stack direction="row" spacing={1}>
              <Button
                onClick={toggleSelectAllGroups}
                variant="outlined"
                disabled={bookmarkGroups.length === 0}
              >
                {isSelectAllGroups ? '전체 선택 해제' : '전체 선택'}
              </Button>
              <Button
                onClick={deleteSelectedGroups}
                variant="outlined"
                disabled={selectedGroups.length === 0}
              >
                그룹 삭제
              </Button>
            </Stack>
          </Box>
        </Stack>

        {bookmarkGroups.length ? (
          <Masonry columns={{ xs: 2, sm: 3 }} spacing={{ xs: 2, sm: 3 }} sx={{ width: 'auto' }}>
            {bookmarkGroups.map((bookmarkGroup) => (
              <Stack key={bookmarkGroup.id} spacing={0.5} sx={{ position: 'relative' }}>
                <Checkbox
                  checked={selectedGroups.includes(bookmarkGroup.id)}
                  onChange={() => handleSelectGroup(bookmarkGroup.id)}
                />
                <Image
                  src={bookmarkGroup.recentImage || '/assets/images/placeholder.svg'}
                  alt={bookmarkGroup.name}
                  sx={{ borderRadius: 1, cursor: 'pointer' }}
                  ratio="1/1"
                  onClick={() => onBookmarkGroupClick(bookmarkGroup.id)}
                />
                <Stack sx={{ px: 0.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {bookmarkGroup.name}{' '}
                    <Typography component="span" color="text.secondary" variant="subtitle1">
                      · {bookmarkGroup.bookmarkCount}개
                    </Typography>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    만든 날짜: {fDate(bookmarkGroup.createdAt)}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Masonry>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 5 }}>
            북마크 그룹이 없습니다.
          </Typography>
        )}
      </Stack>

      {currentGroup && (
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={resetCurrentGroup}
              startIcon={<Iconify icon="mdi:arrow-left" />}
              variant="outlined"
            >
              목록으로
            </Button>
            <Stack direction="row" spacing={1}>
              <Button
                onClick={toggleSelectAllBookmarks}
                variant="outlined"
                disabled={currentGroup.bookmarks.length === 0}
              >
                {isSelectAllBookmarks ? '전체 선택 해제' : '전체 선택'}
              </Button>
              <Button
                onClick={deleteSelectedBookmarks}
                variant="outlined"
                disabled={selectedBookmarks.length === 0}
              >
                북마크 삭제
              </Button>
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="h5">{currentGroup.name}</Typography>
            <UpdateBookmarkDialog bookmarkGroup={currentGroup} onUpdate={fetchPageData} />
          </Box>

          {currentGroup.bookmarks.length ? (
            <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sx={{ width: 'auto' }}>
              {currentGroup.bookmarks.map((bookmark) => (
                <Stack key={bookmark.id} spacing={0.5} sx={{ position: 'relative' }}>
                  <Checkbox
                    checked={selectedBookmarks.includes(bookmark.id)}
                    onChange={() => handleSelectBookmark(bookmark.id)}
                  />
                  <Image
                    src={bookmark.product.mainImage}
                    alt={bookmark.product.name}
                    sx={{ borderRadius: 1, cursor: 'pointer' }}
                    onClick={() => goToProductPage(bookmark.product.id)}
                  />
                  <Stack sx={{ px: 0.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {bookmark.product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      추가한 날짜: {fDate(bookmark.createdAt)}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Masonry>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', my: 5 }}>
              북마크가 없습니다.{' '}
              <Link component={RouterLink} to="/product" color="primary">
                상품 목록으로 이동하기
              </Link>
            </Typography>
          )}
        </Stack>
      )}
    </>
  );
};
