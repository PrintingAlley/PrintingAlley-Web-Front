import { TagInterface } from 'src/types/response.dto';

export const flattenTags = (tags: TagInterface[]): TagInterface[] => {
  let flattened: TagInterface[] = [];
  tags.forEach((tag) => {
    flattened.push(tag);
    if (tag.children && tag.children.length > 0) {
      flattened = flattened.concat(flattenTags(tag.children));
    }
  });
  return flattened;
};
