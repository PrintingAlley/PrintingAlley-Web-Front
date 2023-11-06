import { Button } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { ContentInterface } from 'src/types/response.dto';

interface DeleteContentButtonProps {
  content: ContentInterface;
  onDelete: () => void;
}

export const DeleteContentButton = ({ content, onDelete }: DeleteContentButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const deleteContent = () => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;
    axios
      .delete(`/content/${content.id}`)
      .then(() => {
        enqueueSnackbar('콘텐츠가 성공적으로 삭제되었습니다.', { variant: 'success' });
        onDelete();
      })
      .catch((error) => {
        enqueueSnackbar(`콘텐츠 삭제 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Button
      onClick={deleteContent}
      startIcon={<Iconify icon="ic:baseline-delete" />}
      variant="soft"
    >
      콘텐츠 삭제
    </Button>
  );
};
