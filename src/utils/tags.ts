import { Tag } from 'src/types/print-shop';

export const flattenTags = (tags: Tag[]): Tag[] => {
  let flattened: Tag[] = [];
  tags.forEach((tag) => {
    flattened.push(tag);
    if (tag.children && tag.children.length > 0) {
      flattened = flattened.concat(flattenTags(tag.children));
    }
  });
  return flattened;
};
