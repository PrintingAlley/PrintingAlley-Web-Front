import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Typography, TextField, Box, Card, Stack } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';
import RHFEditor from 'src/components/hook-form/rhf-editor';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFUpload } from 'src/components/hook-form';
import { CreateContent } from 'src/types/content';
import { uploadFileAndGetUrl } from 'src/utils/upload';
import { MAX_FILE_UPLOAD_SIZE } from 'src/config-global';

export const CreateContentForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateContent>({
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods;

  const handleFormSubmit = async (data: CreateContent) => {
    const thumbnailUrl = data.thumbnail ? await uploadFileAndGetUrl(data.thumbnail) : '';

    const formDataWithImages = {
      ...data,
      thumbnail: thumbnailUrl,
    };

    axios
      .post<CreateContent>('/content', formDataWithImages)
      .then((response: any) => {
        enqueueSnackbar('콘텐츠가 성공적으로 추가되었습니다.', { variant: 'success' });
        navigate(`/content/${response.data.dataId}`, { replace: true });
      })
      .catch((error) => {
        enqueueSnackbar(`콘텐츠 추가 중 오류가 발생했습니다. ${error.message}`, {
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

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <Box component={FormProvider} methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
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
                maxSize={MAX_FILE_UPLOAD_SIZE}
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
            startIcon={<Iconify icon="ic:baseline-post-add" />}
            color="primary"
            variant="contained"
            loading={isSubmitting}
          >
            등록하기
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
};
