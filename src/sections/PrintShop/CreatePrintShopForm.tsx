import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { CreatePrintShop, Tag } from 'src/types/print-shop';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';

const flattenTags = (tags: Tag[]): Tag[] => {
  let flattened: Tag[] = [];
  tags.forEach((tag) => {
    flattened.push(tag);
    if (tag.children && tag.children.length > 0) {
      flattened = flattened.concat(flattenTags(tag.children));
    }
  });
  return flattened;
};

interface CreatePrintShopFormProps {
  topLevelTags: Tag[];
  tagHierarchies: Record<number, Tag[]>;
  onAddSuccess: () => void;
}

export const CreatePrintShopForm = ({
  topLevelTags,
  tagHierarchies,
  onAddSuccess,
}: CreatePrintShopFormProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreatePrintShop>();

  const handleFormSubmit = (data: CreatePrintShop) => {
    axios
      .post<CreatePrintShop>('print-shop', data)
      .then(() => {
        enqueueSnackbar('인쇄소가 성공적으로 추가되었습니다.', { variant: 'success' });
        onAddSuccess();
      })
      .catch((error) => {
        enqueueSnackbar(`인쇄소 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        my: 2,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
        }}
      >
        <TextField
          {...register('name', {
            required: '상호명은 필수입니다.',
            minLength: {
              value: 2,
              message: '상호명은 2글자 이상이어야 합니다.',
            },
            maxLength: {
              value: 20,
              message: '상호명은 20글자 이하여야 합니다.',
            },
          })}
          label="상호명"
          placeholder="인쇄소 상호명을 입력하세요"
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextField
          {...register('address', {
            required: '주소는 필수입니다.',
            minLength: {
              value: 2,
              message: '주소는 2글자 이상이어야 합니다.',
            },
            maxLength: {
              value: 200,
              message: '주소는 200글자 이하여야 합니다.',
            },
          })}
          label="주소"
          placeholder="인쇄소의 주소를 입력하세요"
          error={Boolean(errors.address)}
          helperText={errors.address?.message}
        />
        <TextField
          {...register('phone', { required: '전화번호는 필수입니다.' })}
          label="전화번호"
          placeholder="인쇄소의 전화번호를 입력하세요"
          error={Boolean(errors.phone)}
          helperText={errors.phone?.message}
        />
        <TextField
          {...register('email', { required: '이메일은 필수입니다.' })}
          type="email"
          label="이메일"
          placeholder="인쇄소의 이메일을 입력하세요"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          {...register('homepage', { required: '홈페이지는 필수입니다.' })}
          type="url"
          label="홈페이지"
          placeholder="인쇄소의 홈페이지 주소를 입력하세요"
          error={Boolean(errors.homepage)}
          helperText={errors.homepage?.message}
        />
        <TextField
          {...register('representative', {
            required: '대표자는 필수입니다.',
            minLength: {
              value: 2,
              message: '대표자는 2글자 이상이어야 합니다.',
            },
            maxLength: {
              value: 20,
              message: '대표자는 20글자 이하여야 합니다.',
            },
          })}
          label="대표자"
          placeholder="인쇄소의 대표자 이름을 입력하세요"
          error={Boolean(errors.representative)}
          helperText={errors.representative?.message}
        />
        <TextField
          {...register('logoImage', { required: '로고 이미지 URL은 필수입니다.' })}
          type="url"
          label="로고 이미지 URL"
          placeholder="인쇄소의 로고 이미지 URL을 입력하세요"
          error={Boolean(errors.logoImage)}
          helperText={errors.logoImage?.message}
        />
        <TextField
          {...register('backgroundImage', { required: '배경 이미지 URL은 필수입니다.' })}
          type="url"
          label="배경 이미지 URL"
          placeholder="인쇄소의 배경 이미지 URL을 입력하세요"
          error={Boolean(errors.backgroundImage)}
          helperText={errors.backgroundImage?.message}
        />
        <TextField
          {...register('latitude', {
            required: '위도는 필수입니다.',
            pattern: {
              value: /^[-]?[0-9]+([.][0-9]+)?$/,
              message: '위도 형식이 올바르지 않습니다.',
            },
          })}
          label="위도"
          placeholder="인쇄소의 위도를 입력하세요"
          error={Boolean(errors.latitude)}
          helperText={errors.latitude?.message}
        />
        <TextField
          {...register('longitude', {
            required: '경도는 필수입니다.',
            pattern: {
              value: /^[-]?[0-9]+([.][0-9]+)?$/,
              message: '경도 형식이 올바르지 않습니다.',
            },
          })}
          label="경도"
          placeholder="인쇄소의 경도를 입력하세요"
          error={Boolean(errors.longitude)}
          helperText={errors.longitude?.message}
        />
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
          placeholder="인쇄소에 대한 소개글을 입력하세요"
          error={Boolean(errors.introduction)}
          helperText={errors.introduction?.message}
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
      </Box>
      <Button
        type="submit"
        size="large"
        startIcon={<Iconify icon="ic:baseline-add" />}
        color="primary"
        variant="contained"
      >
        추가하기
      </Button>
    </Box>
  );
};
