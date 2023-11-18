import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { paper } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { Box, Button, Chip } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { TagInterface } from 'src/types/response.dto';

// ----------------------------------------------------------------------

interface ProductTagFilterDrawerProps {
  selectedTopLevelTag: TagInterface | null;
  selectedTags: TagInterface[];
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
  tags: Record<number, TagInterface[]>;
}

export default function ProductTagFilterDrawer({
  selectedTopLevelTag,
  selectedTags,
  setSelectedTags,
  tags,
}: ProductTagFilterDrawerProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleTagClick = (tag: TagInterface) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const resetSelectedTags = () => {
    setSelectedTags(selectedTopLevelTag ? [selectedTopLevelTag] : []);
  };

  const tagList = selectedTopLevelTag ? tags[selectedTopLevelTag.id] : [];

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
        <Typography variant="h6">필터</Typography>
        <Iconify icon="ic:baseline-filter-list" />
      </Box>

      <Tooltip title="초기화">
        <IconButton onClick={resetSelectedTags}>
          <Badge color="error" variant="dot" invisible={!(selectedTags.length > 1)}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outlined"
        sx={{ borderColor: 'divider', borderRadius: 3 }}
        endIcon={<Iconify icon="ic:baseline-filter-list" />}
      >
        필터
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            ...paper({ theme, bgcolor: theme.palette.background.default }),
            width: 320,
            maxWidth: 1,
          },
        }}
      >
        {renderHead}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar>
          <Stack sx={{ p: 2, pr: 1 }}>
            {tagList.length ? (
              tagList.map((tag, index) => (
                <Box key={tag.id}>
                  {tag.children.length > 0 ? (
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {tag.name}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          mb: 2,
                          ml: 1,
                        }}
                      >
                        {tag.children.map((child) =>
                          child.children.length > 0 ? (
                            <Box key={child.id}>
                              <Typography variant="subtitle2" gutterBottom>
                                {child.name}
                              </Typography>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexWrap: 'wrap',
                                  gap: 1,
                                  ml: 0.5,
                                }}
                              >
                                {child.children.map((grandChild) => (
                                  <Chip
                                    color="primary"
                                    key={grandChild.id}
                                    variant={
                                      selectedTags.includes(grandChild) ? 'filled' : 'outlined'
                                    }
                                    onClick={() => handleTagClick(grandChild)}
                                    label={grandChild.name}
                                  />
                                ))}
                              </Box>
                            </Box>
                          ) : (
                            <Chip
                              color="secondary"
                              key={child.id}
                              variant={selectedTags.includes(child) ? 'filled' : 'outlined'}
                              onClick={() => handleTagClick(child)}
                              label={child.name}
                            />
                          )
                        )}
                      </Box>
                      {index !== tagList.length - 1 && <Divider sx={{ mb: 2 }} />}
                    </Box>
                  ) : (
                    <Chip
                      color="info"
                      variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                      onClick={() => handleTagClick(tag)}
                      label={tag.name}
                    />
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                카테고리를 선택하면 필터가 표시됩니다.
              </Typography>
            )}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
