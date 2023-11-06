import { Box, ButtonGroup } from '@mui/material';
import axios from 'src/utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import SkeletonSection from 'src/sections/common/SkeletonSection';
import { ContentInterface, GetContentResponse } from 'src/types/response.dto';
import Markdown from 'src/components/markdown';
import ContentDetailHero from 'src/sections/Content/ContentDetailHero';
import { DeleteContentButton } from 'src/sections/Content/DeleteContentButton';
import { UpdateContentDialog } from 'src/sections/Content/UpdateContentDialog';

export default function ContentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentInterface | null>(null);

  const fetchContent = () => {
    axios.get<GetContentResponse>(`/content/${id}`).then((response) => {
      setContent(response.data.content);
    });
  };

  const onAdd = () => {
    fetchContent();
  };

  const onDelete = () => {
    navigate('/', { replace: true });
  };

  useEffect(() => {
    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {content ? (
        <div>
          <ContentDetailHero content={content} />

          <Box sx={{ height: 40 }} />

          <Markdown>{content.content}</Markdown>

          <Box sx={{ height: 64 }} />

          <ButtonGroup color="inherit">
            <UpdateContentDialog content={content} onAdd={onAdd} />
            <DeleteContentButton content={content} onDelete={onDelete} />
          </ButtonGroup>
        </div>
      ) : (
        <SkeletonSection />
      )}
    </>
  );
}
