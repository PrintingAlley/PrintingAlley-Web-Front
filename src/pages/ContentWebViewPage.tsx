import { Box, Dialog, Typography } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { ContentInterface, GetContentResponse } from 'src/types/response.dto';
import Markdown from 'src/components/markdown';
import ContentWebViewHero from 'src/sections/Content/ContentWebViewHero';

export default function ContentWebViewPage() {
  const { id } = useParams();
  const [content, setContent] = useState<ContentInterface | null>(null);

  const fetchContent = () => {
    axios.get<GetContentResponse>(`/content/${id}`).then((response) => {
      setContent(response.data.content);
    });
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <Dialog open fullScreen>
        <Box>
          {content ? (
            <>
              <ContentWebViewHero content={content} />

              <Box sx={{ padding: '12px 15px' }}>
                <Typography variant="h3" component="h1">
                  {content.title}
                </Typography>
              </Box>

              <Markdown>{content.content}</Markdown>

              <Box sx={{ height: 64 }} />
            </>
          ) : (
            <SkeletonSection />
          )}
        </Box>
      </Dialog>
    </div>
  );
}
