import { LoadingButton } from '@mui/lab';
import { Box, TextField, Rating, ButtonGroup, Typography, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFUpload } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { CreateReview } from 'src/types/review';
import axios from 'src/utils/axios';
import { uploadFilesAndGetUrls } from 'src/utils/upload';

const labels: { [index: string]: string } = {
  1: '별로에요',
  2: '그럭저럭',
  3: '괜찮아요',
  4: '좋아요',
  5: '최고에요',
};

export function AddReviewForm({
  type,
  targetId,
  onAdd,
}: {
  type: 'product' | 'print-shop';
  targetId: number;
  onAdd: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<CreateReview>({ defaultValues: { rating: 5 } });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const [hover, setHover] = useState(-1);

  const values = watch();

  const handleFormSubmit = async (data: CreateReview) => {
    const imageUrls = data.images ? await uploadFilesAndGetUrls(data.images) : [];

    const postData = {
      rating: data.rating,
      content: data.content,
      images: imageUrls,
    };

    axios
      .post<CreateReview>(`/${type}/${targetId}/review`, postData)
      .then((response: any) => {
        enqueueSnackbar('리뷰가 성공적으로 추가되었습니다.', { variant: 'success' });
        reset();
        onAdd();
      })
      .catch((error) => {
        enqueueSnackbar(`리뷰 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  return (
    <Box component={FormProvider} methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={2}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>{labels[hover !== -1 ? hover : values.rating]}</Typography>
          <Rating
            size="large"
            name="rating"
            value={values.rating}
            defaultValue={5}
            onChange={(event, newValue) => {
              setValue('rating', newValue ?? 5);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            disabled={isSubmitting}
          />
        </Box>

        <TextField
          {...register('content', {
            required: '내용을 작성해주세요.',
            minLength: {
              value: 2,
              message: '내용은 2글자 이상이어야 합니다.',
            },
            maxLength: {
              value: 1000,
              message: '내용은 1000글자 이하여야 합니다.',
            },
          })}
          placeholder="리뷰를 작성해주세요."
          error={Boolean(errors.content)}
          helperText={errors.content?.message}
          fullWidth
          multiline
          rows={4}
          disabled={isSubmitting}
        />

        <RHFUpload
          multiple
          thumbnail
          name="images"
          maxSize={3145728}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
          disabled={isSubmitting}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonGroup color="inherit">
            <LoadingButton type="submit" variant="outlined" loading={isSubmitting}>
              등록
            </LoadingButton>
          </ButtonGroup>
        </Box>
      </Stack>
    </Box>
  );
}
