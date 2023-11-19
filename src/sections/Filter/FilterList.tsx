import { Box, Chip } from '@mui/material';
import { m } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { varFade } from 'src/components/animate';
import { TagInterface } from 'src/types/response.dto';

interface FilterListProps {
  selectedTopLevelTag: TagInterface | null;
  setSelectedTopLevelTag: Dispatch<SetStateAction<TagInterface | null>>;
  selectedTags: TagInterface[];
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
}

export default function FilterList({
  selectedTopLevelTag,
  setSelectedTopLevelTag,
  selectedTags,
  setSelectedTags,
}: FilterListProps) {
  const handleTagClick = (tag: TagInterface) => {
    if (selectedTopLevelTag?.id === tag.id) {
      setSelectedTopLevelTag(null);
    }
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  return (
    <Box sx={{ display: selectedTags.length ? 'flex' : 'none', flexWrap: 'wrap', gap: 1, px: 0.5 }}>
      {selectedTags.map((tag) => (
        <Chip
          key={tag.id}
          component={m.div}
          {...varFade().in}
          color="primary"
          label={tag.name}
          onDelete={() => handleTagClick(tag)}
        />
      ))}
    </Box>
  );
}
