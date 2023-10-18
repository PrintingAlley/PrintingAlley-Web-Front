import { Typography, Chip, Box, Divider } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Tag } from 'src/types/print-shop';

interface TagFilterProps {
  selectedTags: number[];
  setSelectedTags: Dispatch<SetStateAction<number[]>>;
  topLevelTags: Tag[];
  tags: Record<number, Tag[]>;
}

export const TagFilter = ({
  selectedTags,
  setSelectedTags,
  topLevelTags,
  tags,
}: TagFilterProps) => {
  const [selectedTopLevelTag, setSelectedTopLevelTag] = useState<Tag | null>(null);

  const handleTagClick = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    } else {
      setSelectedTags((prev) => [...prev, tagId]);
    }
  };

  useEffect(() => {
    setSelectedTags([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTopLevelTag]);

  const tagList = selectedTopLevelTag ? tags[selectedTopLevelTag.id] : [];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        카테고리 선택
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {topLevelTags.map((tag) => (
          <Chip
            key={tag.id}
            variant={selectedTopLevelTag?.id === tag.id ? 'filled' : 'outlined'}
            onClick={() => setSelectedTopLevelTag(tag)}
            label={tag.name}
          />
        ))}
      </Box>

      {tagList.map((tag) => (
        <Box key={tag.id}>
          <Divider sx={{ my: 1.5 }} />
          {tag.children.length > 0 ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                {tag.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  ml: 1,
                }}
              >
                {tag.children.map((child) =>
                  child.children.length > 0 ? (
                    <Box key={child.id} width={1} mb={1}>
                      <Typography variant="subtitle2" mb={0.5}>
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
                            color="secondary"
                            key={grandChild.id}
                            variant={selectedTags.includes(grandChild.id) ? 'filled' : 'outlined'}
                            onClick={() => handleTagClick(grandChild.id)}
                            label={grandChild.name}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Chip
                      color="info"
                      key={child.id}
                      variant={selectedTags.includes(child.id) ? 'filled' : 'outlined'}
                      onClick={() => handleTagClick(child.id)}
                      label={child.name}
                    />
                  )
                )}
              </Box>
            </Box>
          ) : (
            <Chip
              color="primary"
              variant={selectedTags.includes(tag.id) ? 'filled' : 'outlined'}
              onClick={() => handleTagClick(tag.id)}
              label={tag.name}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};
