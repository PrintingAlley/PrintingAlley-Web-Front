import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  TextField,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormLabel,
  Paper,
  Avatar,
  IconButton,
  Card,
  CardHeader,
  Stack,
  Divider,
  Alert,
  alpha,
} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import useFileUpload from 'src/hooks/useFileUpload';
import { useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';
import { CreateProduct } from 'src/types/product';
import { CategoryInterface, TagInterface } from 'src/types/response.dto';
import useFilesUpload from 'src/hooks/useFilesUpload';
import { useCategory } from 'src/hooks/useCategory';
import RHFEditor from 'src/components/hook-form/rhf-editor';
import FormProvider from 'src/components/hook-form/form-provider';
import { flattenArray } from 'src/utils/flatten-array';
import { FileUploadButton } from '../common/FileUploadButton';
import { FilesUploadButton } from '../common/FilesUploadButton';

interface CreateProductFormProps {
  topLevelTags: TagInterface[];
  tagHierarchies: Record<number, TagInterface[]>;
}

const findCategoryNameByCategoryId = (categoryId: number, categories: CategoryInterface[]) =>
  categories.find((category) => category.id === categoryId)?.name;

const findTopTagByCategoryName = (categoryName: string, topLevelTags: TagInterface[]) =>
  topLevelTags.find((tag) => tag.name === categoryName);

export const findTopTagByCategoryId = (
  categoryId: number,
  categories: CategoryInterface[],
  topLevelTags: TagInterface[]
) => {
  const categoryName = findCategoryNameByCategoryId(categoryId, categories);
  return categoryName ? findTopTagByCategoryName(categoryName, topLevelTags) : null;
};

export const CreateProductForm = ({ topLevelTags, tagHierarchies }: CreateProductFormProps) => {
  const navigate = useNavigate();
  const { categories } = useCategory();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<CreateProduct>({ mode: 'onChange' });

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods;

  const categoryId = getValues('categoryId');
  const topTagByCurrentCategory = findTopTagByCategoryId(categoryId, categories, topLevelTags);

  const {
    handleFileChange: handleMainFileChange,
    uploadFile: uploadMainFile,
    previewUrl: mainPreviewUrl,
  } = useFileUpload();
  const {
    handleFileChange: handleImageFilesChange,
    uploadFiles: uploadImageFiles,
    previewUrls: imagePreviewUrls,
    removeFileAtIndex: removeImageFileAtIndex,
  } = useFilesUpload();

  useEffect(() => {
    setValue('tagIds', []);
  }, [topTagByCurrentCategory, setValue]);

  const handleFormSubmit = async (data: CreateProduct) => {
    const mainImageUrl = await uploadMainFile();
    const imageUrls = await uploadImageFiles();

    const formDataWithImages = {
      ...data,
      tagIds: [...data.tagIds, topTagByCurrentCategory?.id],
      mainImage: mainImageUrl,
      images: imageUrls,
    };

    axios
      .post<CreateProduct>('/product', formDataWithImages)
      .then((response: any) => {
        enqueueSnackbar('상품이 성공적으로 추가되었습니다.', { variant: 'success' });
        navigate(`/product/${response.data.dataId}`, { replace: true });
      })
      .catch((error) => {
        enqueueSnackbar(`상품 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  return (
    <Box component={FormProvider} methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
        <Card>
          <CardHeader title="상품 기본 정보" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              {...register('name', {
                required: '상품명은 필수입니다.',
                minLength: {
                  value: 2,
                  message: '상품명은 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '상품명은 50글자 이하여야 합니다.',
                },
              })}
              label="상품명"
              placeholder="상품명을 입력하세요"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <TextField
              {...register('categoryId', {
                required: '카테고리는 필수입니다.',
                min: {
                  value: 1,
                  message: '카테고리를 선택하세요',
                },
              })}
              label="카테고리"
              placeholder="상품 카테고리를 선택하세요"
              select
              error={Boolean(errors.categoryId)}
              helperText={errors.categoryId?.message}
              defaultValue={0}
            >
              <MenuItem value={0} disabled sx={{ fontStyle: 'italic' }}>
                카테고리를 선택하세요
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              {...register('size', {
                required: '제품 크기는 필수입니다.',
                minLength: {
                  value: 2,
                  message: '제품 크기는 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '제품 크기는 50글자 이하여야 합니다.',
                },
              })}
              label="제품 크기"
              placeholder="90*50mm"
              error={Boolean(errors.size)}
              helperText={errors.size?.message}
            />
            <TextField
              {...register('paper', {
                required: '종이 종류는 필수입니다.',
                minLength: {
                  value: 2,
                  message: '종이 종류는 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '종이 종류는 50글자 이하여야 합니다.',
                },
              })}
              label="종이 종류"
              placeholder="미색모조지 150g"
              error={Boolean(errors.paper)}
              helperText={errors.paper?.message}
            />
            <TextField
              {...register('designer', {
                required: '디자이너 정보는 필수입니다.',
                minLength: {
                  value: 2,
                  message: '디자이너 정보는 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '디자이너 정보는 50글자 이하여야 합니다.',
                },
              })}
              label="디자이너 또는 디자인 스튜디오 이름"
              placeholder="디자이너 정보를 입력하세요"
              error={Boolean(errors.designer)}
              helperText={errors.designer?.message}
            />
          </Stack>
        </Card>

        <Card>
          <CardHeader title="상품 이미지 등록" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Paper
              variant="outlined"
              sx={{
                padding: '16.5px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <FormLabel>메인 이미지</FormLabel>
              {mainPreviewUrl && (
                <Avatar
                  src={mainPreviewUrl}
                  alt="Main Preview"
                  sx={{ width: 200, height: 'auto', alignSelf: 'center' }}
                  variant="rounded"
                />
              )}
              <FileUploadButton
                onChange={handleMainFileChange}
                disabled={isSubmitting}
                error={errors.mainImage?.message}
              >
                메인 이미지 선택
              </FileUploadButton>
            </Paper>
            <Paper
              variant="outlined"
              sx={{
                padding: '16.5px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <FormLabel>상품 이미지</FormLabel>
              <Box sx={{ display: 'flex', gap: 1, overflow: 'auto' }}>
                {imagePreviewUrls.map((url, index) => (
                  <Box key={url} sx={{ position: 'relative' }}>
                    <Avatar
                      src={url}
                      alt="Image Preview"
                      sx={{
                        width: 200,
                        height: 'auto',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                      variant="rounded"
                    />
                    <IconButton
                      size="small"
                      onClick={() => removeImageFileAtIndex(index)}
                      sx={{
                        top: 8,
                        right: 8,
                        position: 'absolute',
                        color: 'common.white',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        },
                      }}
                    >
                      <Iconify icon="mingcute:close-line" width={14} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <FilesUploadButton
                onChange={handleImageFilesChange}
                disabled={isSubmitting}
                error={errors.images?.message}
              >
                여러 이미지를 선택할 수 있습니다.
                {'\n'}
                메인 이미지를 제외한 이미지들을 선택해주세요.
              </FilesUploadButton>
            </Paper>
          </Stack>
        </Card>

        <Card>
          <CardHeader title="상품 설명" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              {...register('introduction', {
                required: '소개글은 필수입니다.',
                minLength: {
                  value: 2,
                  message: '소개글은 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 2000,
                  message: '소개글은 2000글자 이하여야 합니다.',
                },
              })}
              label="한 줄 소개글"
              placeholder="상품에 대한 한 줄 소개글을 입력하세요"
              error={Boolean(errors.introduction)}
              helperText={errors.introduction?.message}
            />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">설명글</Typography>
              <RHFEditor name="description" />
            </Stack>
          </Stack>
        </Card>

        <Card>
          <CardHeader title="인쇄 종류" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {topTagByCurrentCategory ? (
                <FormControl
                  key={topTagByCurrentCategory.id}
                  fullWidth
                  error={Boolean(errors.tagIds)}
                >
                  <InputLabel>{topTagByCurrentCategory.name}</InputLabel>
                  <Controller
                    name="tagIds"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label={topTagByCurrentCategory.name}
                        multiple
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as number[]).map((value) => {
                              const item = flattenArray(
                                tagHierarchies[topTagByCurrentCategory.id] || []
                              ).find((tag) => tag.id === value);
                              if (!item) {
                                return null;
                              }
                              return <Chip key={value} label={item.name} />;
                            })}
                          </Box>
                        )}
                      >
                        {flattenArray(tagHierarchies[topTagByCurrentCategory.id] || [])
                          .filter((tag) => !tag.children.length)
                          .map((tag) => (
                            <MenuItem key={tag.id} value={tag.id}>
                              {tag.name}
                            </MenuItem>
                          ))}
                      </Select>
                    )}
                  />
                  {errors.tagIds && <Typography color="error">{errors.tagIds.message}</Typography>}
                </FormControl>
              ) : (
                <Alert severity="warning">카테고리를 선택하세요.</Alert>
              )}
            </Box>
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
