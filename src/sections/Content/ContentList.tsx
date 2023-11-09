import { Typography, Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useNavigate } from 'react-router';
import { ContentInterface } from 'src/types/response.dto';
import Image from 'src/components/image';
import NoResult from '../common/NoResult';

interface ContentListProps {
  contents: ContentInterface[];
}

export const ContentList = ({ contents }: ContentListProps) => {
  const navigate = useNavigate();

  const goToContentPage = (content: ContentInterface) => {
    navigate(`/content/${content.id}`);
  };

  return (
    <>
      {contents.length ? (
        <Masonry columns={2} spacing={3} sx={{ width: 'auto' }}>
          {contents.map((content) => (
            <Box
              key={content.id}
              onClick={() => goToContentPage(content)}
              sx={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', gap: 1 }}
            >
              <Image
                src={content.thumbnail}
                alt={content.title}
                sx={{ borderRadius: 1 }}
                ratio="4/3"
              />
              <Typography
                variant="subtitle1"
                sx={{ mx: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
              >
                {content.title}
              </Typography>
            </Box>
          ))}
        </Masonry>
      ) : (
        <NoResult />
      )}
    </>
  );
};
