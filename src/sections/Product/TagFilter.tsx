import { Typography, Chip, Box, Divider, Avatar } from '@mui/material';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TagInterface } from 'src/types/response.dto';

interface TagFilterProps {
  selectedTopLevelTag: TagInterface | null;
  setSelectedTopLevelTag: Dispatch<SetStateAction<TagInterface | null>>;
  selectedTags: number[];
  setSelectedTags: Dispatch<SetStateAction<number[]>>;
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          py: 1,
          flexWrap: 'wrap',
        }}
      >
        {topLevelTags.map((tag) => (
          <Box
            key={tag.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedTopLevelTag(tag)}
          >
            <Avatar src={tag.image ?? ''} alt={tag.name} sx={{ width: 56, height: 56 }} />
            <Typography variant="caption">{tag.name}</Typography>
          </Box>
        ))}
      </Box>

      {tagList.map((tag) => (
        <Box key={tag.id} sx={{ mt: 2 }}>
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
                            variant={selectedTags.includes(grandChild.id) ? 'filled' : 'outlined'}
                            onClick={() => handleTagClick(grandChild.id)}
                            label={grandChild.name}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : (
                    <Chip
                      color="secondary"
                      key={child.id}
                      variant={selectedTags.includes(child.id) ? 'filled' : 'outlined'}
                      onClick={() => handleTagClick(child.id)}
                      label={child.name}
                    />
                  )
                )}
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ) : (
            <Chip
              color="info"
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
