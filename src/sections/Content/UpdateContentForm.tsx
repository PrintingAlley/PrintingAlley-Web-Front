import { useForm } from 'react-hook-form';
import { Typography, TextField, Box, Card, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { ContentInterface } from 'src/types/response.dto';
import { UpdateContent } from 'src/types/content';
import RHFEditor from 'src/components/hook-form/rhf-editor';
import FormProvider from 'src/components/hook-form/form-provider';
import { useCallback } from 'react';
import { uploadFileAndGetUrl } from 'src/utils/upload';
import { RHFUpload } from 'src/components/hook-form';

interface UpdateContentFormProps {
  content: ContentInterface;
  onAddSuccess: () => void;
}

export const UpdateContentForm = ({ content, onAddSuccess }: UpdateContentFormProps) => {
  const { title, content: contentText, thumbnail } = content;
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<UpdateContent>({
    mode: 'onChange',
    defaultValues: {
      title,
      content: contentText,
      thumbnail,
    },
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: UpdateContent) => {
    let thumbnailUrl = data.thumbnail;
    if (thumbnailUrl instanceof File) {
      thumbnailUrl = await uploadFileAndGetUrl(thumbnailUrl);
    }

    const formDataWithImages = {
      ...data,
      thumbnail: thumbnailUrl,
    };

    axios
      .put<UpdateContent>(`/content/${content.id}`, formDataWithImages)
      .then(() => {
        enqueueSnackbar('콘텐츠가 성공적으로 업데이트 되었습니다.', { variant: 'success' });
        onAddSuccess();
      })
      .catch((error) => {
        enqueueSnackbar(`콘텐츠 업데이트 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('thumbnail', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('thumbnail', null);
  }, [setValue]);

  return (
    <Box component={FormProvider} methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3} my={3}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              {...register('title', {
                required: '제목은 필수입니다.',
                minLength: {
                  value: 2,
                  message: '제목은 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 200,
                  message: '제목은 200글자 이하여야 합니다.',
                },
              })}
              label="제목"
              placeholder="제목을 입력하세요"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
            />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">설명글</Typography>
              <RHFEditor name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">썸네일 이미지</Typography>
              <RHFUpload
                name="thumbnail"
                maxSize={3145728}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>
          </Stack>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            size="large"
            startIcon={<Iconify icon="ic:baseline-edit" />}
            color="primary"
            variant="contained"
            loading={isSubmitting}
          >
            수정하기
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
};
