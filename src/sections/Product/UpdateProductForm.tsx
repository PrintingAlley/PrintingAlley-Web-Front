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
  Avatar,
  FormLabel,
  Paper,
  IconButton,
} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import { flattenTags } from 'src/utils/tags';
import useFileUpload from 'src/hooks/useFileUpload';
import LoadingButton from '@mui/lab/LoadingButton';
import useFilesUpload from 'src/hooks/useFilesUpload';
import { ProductDetail, TagInterface } from 'src/types/response.dto';
import { CreateProduct } from 'src/types/product';
import { useCategory } from 'src/hooks/useCategory';
import { FileUploadButton } from '../common/FileUploadButton';
import { FilesUploadButton } from '../common/FilesUploadButton';

interface UpdateProductFormProps {
  product: ProductDetail;
  topLevelTags: TagInterface[];
  tagHierarchies: Record<number, TagInterface[]>;
  onAddSuccess: () => void;
}

export const UpdateProductForm = ({
  product,
  topLevelTags,
  tagHierarchies,
  onAddSuccess,
}: UpdateProductFormProps) => {
  const {
    name,
    size,
    paper,
    afterProcess,
    designer,
    introduction,
    description,
    mainImage,
    images,
    category,
    tags,
  } = product;
  const { categories } = useCategory();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateProduct>({
    mode: 'onChange',
    defaultValues: {
      name,
      size,
      paper,
      afterProcess,
      designer,
      introduction,
      description,
      mainImage,
      images,
      categoryId: category.id,
      // TODO: printShopId 추후 제거
      printShopId: 1,
      tagIds: flattenTags(tags).map((tag) => tag.id),
    },
  });

  const {
    handleFileChange: handleMainFileChange,
    uploadFile: uploadMainFile,
    previewUrl: mainPreviewUrl,
  } = useFileUpload(mainImage);
  const {
    handleFileChange: handleImageFilesChange,
    uploadFiles: uploadImageFiles,
    previewUrls: imagePreviewUrls,
    removeFileAtIndex: removeImageFileAtIndex,
  } = useFilesUpload(images);

  const handleFormSubmit = async (data: CreateProduct) => {
    const mainImageUrl = await uploadMainFile();
    const imageUrls = await uploadImageFiles();

    const formDataWithImages = {
      ...data,
      mainImage: mainImageUrl ?? mainImage,
      images: imageUrls,
    };

    axios
      .put<CreateProduct>(`/product/${product.id}`, formDataWithImages)
      .then(() => {
        enqueueSnackbar('제품이 성공적으로 업데이트 되었습니다.', { variant: 'success' });
        onAddSuccess();
      })
      .catch((error) => {
        enqueueSnackbar(`제품 업데이트 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 2,
        pt: 2,
      }}
    >
      <TextField
        {...register('name', {
          required: '제품명은 필수입니다.',
          minLength: {
            value: 2,
            message: '제품명은 2글자 이상이어야 합니다.',
          },
          maxLength: {
            value: 50,
            message: '제품명은 50글자 이하여야 합니다.',
          },
        })}
        label="제품명"
        placeholder="제품명을 입력하세요"
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />
      {categories.length && (
        <TextField
          {...register('categoryId', {
            required: '카테고리는 필수입니다.',
            min: {
              value: 1,
              message: '카테고리를 선택하세요',
            },
          })}
          label="카테고리"
          placeholder="제품 카테고리를 선택하세요"
          select
          error={Boolean(errors.categoryId)}
          helperText={errors.categoryId?.message}
          defaultValue={category.id}
        >
          <MenuItem value={0} disabled>
            카테고리를 선택하세요
          </MenuItem>
          {categories.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      )}
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
        placeholder="종이이름+평량(g)"
        error={Boolean(errors.paper)}
        helperText={errors.paper?.message}
      />
      <TextField
        {...register('afterProcess', {
          required: '후가공은 필수입니다.',
          minLength: {
            value: 2,
            message: '후가공은 2글자 이상이어야 합니다.',
          },
          maxLength: {
            value: 50,
            message: '후가공은 50글자 이하여야 합니다.',
          },
        })}
        label="후가공"
        placeholder="도무송"
        error={Boolean(errors.afterProcess)}
        helperText={errors.afterProcess?.message}
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
            sx={{ width: '100%', height: 'auto' }}
            variant="rounded"
          />
        )}
        <FileUploadButton onChange={handleMainFileChange}>메인 이미지 선택</FileUploadButton>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          gridColumn: '1 / span 2',
          padding: '16.5px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <FormLabel>제품 이미지</FormLabel>
        <Box sx={{ display: 'flex', gap: 1, overflow: 'auto' }}>
          {imagePreviewUrls.map((url, index) => (
            <Box key={url} sx={{ position: 'relative' }}>
              <Avatar
                src={url}
                alt="Image Preview"
                sx={{ width: 200, height: 'auto' }}
                variant="rounded"
              />
              <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, padding: 0 }}
                onClick={() => removeImageFileAtIndex(index)}
              >
                <Iconify icon="ic:baseline-close" />
              </IconButton>
            </Box>
          ))}
        </Box>
        <FilesUploadButton onChange={handleImageFilesChange}>
          제품 이미지 선택 (여러개를 선택할 수 있습니다.)
        </FilesUploadButton>
      </Paper>

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
        label="소개글"
        placeholder="제품에 대한 소개글을 입력하세요"
        error={Boolean(errors.introduction)}
        helperText={errors.introduction?.message}
        sx={{ gridColumn: '1 / span 2' }}
      />
      <TextField
        {...register('description', {
          required: '설명글은 필수입니다.',
          minLength: {
            value: 2,
            message: '설명글은 2글자 이상이어야 합니다.',
          },
          maxLength: {
            value: 2000,
            message: '설명글은 2000글자 이하여야 합니다.',
          },
        })}
        label="설명글"
        placeholder="제품에 대한 자세한 설명글을 입력하세요"
        error={Boolean(errors.description)}
        helperText={errors.description?.message}
        multiline
        rows={4}
        sx={{ gridColumn: '1 / span 2' }}
      />
      <Box
        sx={{
          gridColumn: '1 / span 2',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {topLevelTags.map((topTag) => (
          <FormControl key={topTag.id} fullWidth error={Boolean(errors.tagIds)}>
            <InputLabel>{topTag.name}</InputLabel>
            <Controller
              name="tagIds"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as number[]).map((value) => {
                        const item = flattenTags(tagHierarchies[topTag.id] || []).find(
                          (tag) => tag.id === value
                        );
                        if (!item) {
                          return null;
                        }
                        return <Chip key={value} label={item.name} />;
                      })}
                    </Box>
                  )}
                >
                  {flattenTags(tagHierarchies[topTag.id] || [])
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
        ))}
      </Box>
      <LoadingButton
        sx={{ gridColumn: '1 / span 2' }}
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
  );
};
