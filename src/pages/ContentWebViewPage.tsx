import { Box, Container, Dialog } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { ContentInterface, GetContentResponse } from 'src/types/response.dto';
import Markdown from 'src/components/markdown';
import ContentDetailHero from 'src/sections/Content/ContentDetailHero';

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
        <Container maxWidth="sm">
          {content ? (
            <>
              <ContentDetailHero content={content} isWebView />

              <Box sx={{ height: 40 }} />

              <Markdown>{content.content}</Markdown>

              <Box sx={{ height: 64 }} />
            </>
          ) : (
            <SkeletonSection />
          )}
        </Container>
      </Dialog>
    </div>
  );
}
