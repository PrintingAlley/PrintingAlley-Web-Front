import {
  Typography,
  Chip,
  Box,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { m } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import { TagInterface } from 'src/types/response.dto';

interface PrintShopTagFilterProps {
  selectedTopLevelTag: TagInterface | null;
  selectedTags: TagInterface[];
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
  tags: Record<number, TagInterface[]>;
}

export const PrintShopTagFilter = ({
  selectedTopLevelTag,
  selectedTags,
  setSelectedTags,
  tags,
}: PrintShopTagFilterProps) => {
  const handleTagClick = (tag: TagInterface) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const tagList = selectedTopLevelTag ? tags[selectedTopLevelTag.id] : [];

  return (
    <Accordion
      variant="outlined"
      sx={{
        '&.MuiAccordion-root': { borderRadius: 3 },
        '&.MuiAccordion-root:before': { display: 'none' },
      }}
      disableGutters
    >
      <AccordionSummary expandIcon={<Iconify icon="ic:round-expand-more" />}>
        <Stack spacing={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: selectedTags.length ? 'primary.main' : 'text.disabled',
            }}
          >
            <Typography variant="subtitle1">필터</Typography>
            <Iconify icon="ic:baseline-filter-list" />
          </Box>
          {selectedTags.length ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                                variant={selectedTags.includes(grandChild) ? 'filled' : 'outlined'}
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
  );
};
