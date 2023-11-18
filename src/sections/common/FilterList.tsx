import { Box, Chip } from '@mui/material';
import { m } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { varFade } from 'src/components/animate';
import { TagInterface } from 'src/types/response.dto';

interface FilterListProps {
  selectedTopLevelTag: TagInterface | null;
  selectedTags: TagInterface[];
  setSelectedTags: Dispatch<SetStateAction<TagInterface[]>>;
}

export default function FilterList({
  selectedTopLevelTag,
  selectedTags,
  setSelectedTags,
}: FilterListProps) {
  const handleTagClick = (tag: TagInterface) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((id) => id !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  return (
    <Box sx={{ display: selectedTags.length ? 'flex' : 'none', flexWrap: 'wrap', gap: 1, pl: 0.5 }}>
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
  );
}
