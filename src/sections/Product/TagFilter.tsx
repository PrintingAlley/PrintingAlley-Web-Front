import {
  Typography,
  Chip,
  Box,
  Divider,
  ButtonBase,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { m } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { TagInterface } from 'src/types/response.dto';

interface TagFilterProps {
  selectedTopLevelTag: TagInterface | null;
  setSelectedTopLevelTag: Dispatch<SetStateAction<TagInterface | null>>;
  selectedTags: TagInterface[];
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
  topLevelTags: TagInterface[];
  tags: Record<number, TagInterface[]>;
}

export const TagFilter = ({
  selectedTopLevelTag,
  setSelectedTopLevelTag,
  selectedTags,
  setSelectedTags,
  topLevelTags,
  tags,
}: TagFilterProps) => {
  const handleTagClick = (tag: TagInterface) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  useEffect(() => {
    setSelectedTags(selectedTopLevelTag ? [selectedTopLevelTag] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopLevelTag]);

  const tagList = selectedTopLevelTag ? tags[selectedTopLevelTag.id] : [];

  return (
    <Stack spacing={4} my={1}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {topLevelTags.map((tag) => {
          const isSelected = selectedTopLevelTag?.id === tag.id;
          return (
            <ButtonBase
              key={tag.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                border: '1.5px solid',
                borderColor: isSelected ? 'primary.light' : 'transparent',
                borderRadius: 1,
                backgroundColor: 'background.paper',
                p: 0.5,
              }}
              onClick={() => setSelectedTopLevelTag(tag)}
            >
              <Box
                component="img"
                src={tag.image ?? ''}
                alt={tag.name}
                sx={{ width: 56, height: 56, WebkitUserDrag: 'none' }}
              />
              <Typography variant="caption">{tag.name}</Typography>
            </ButtonBase>
          );
        })}
      </Box>

      <Accordion
        variant="outlined"
        sx={{
          borderRadius: 1,
          '&.MuiAccordion-root:before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary expandIcon={<Iconify icon="ic:round-expand-more" />}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="subtitle1">필터</Typography>
              <Iconify icon="ic:round-filter-alt" />
            </Box>
            {tagList.length ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, overflow: 'auto' }}>
                {selectedTags.map((tag) => (
                  <Chip
                    key={tag.id}
                    component={m.div}
                    {...varFade().in}
                    color="primary"
                    label={tag.name}
                    onDelete={tag === selectedTopLevelTag ? undefined : () => handleTagClick(tag)}
                  />
                ))}
              </Box>
            ) : null}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
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
                                ml: 1,
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
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
