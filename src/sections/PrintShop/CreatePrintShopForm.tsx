import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Box,
  FormLabel,
  Paper,
  Avatar,
  Divider,
  Alert,
  Card,
  CardHeader,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
} from '@mui/material';
import { CreatePrintShop } from 'src/types/print-shop';
import Iconify from 'src/components/iconify/iconify';
import { useSnackbar } from 'notistack';
import axios from 'src/utils/axios';
import DaumPostcode from 'react-daum-postcode';
import useFileUpload from 'src/hooks/useFileUpload';
import useLatLng from 'src/hooks/useLatLng';
import { useNavigate } from 'react-router';
import LoadingButton from '@mui/lab/LoadingButton';
import { flattenTags } from 'src/utils/tags';
import { TagInterface } from 'src/types/response.dto';
import { FileUploadButton } from '../common/FileUploadButton';

const postCodeStyle = {
  height: '450px',
};

interface CreatePrintShopFormProps {
  topLevelTags: TagInterface[];
  tagHierarchies: Record<number, TagInterface[]>;
}

export const CreatePrintShopForm = ({ topLevelTags, tagHierarchies }: CreatePrintShopFormProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CreatePrintShop>({
    mode: 'onChange',
    defaultValues: {
      type: '인쇄사',
      latitude: '0',
      longitude: '0',
    },
  });

  const {
    handleFileChange: handleLogoFileChange,
    uploadFile: uploadLogoFile,
    previewUrl: logoPreviewUrl,
  } = useFileUpload();
  const {
    handleFileChange: handleBackgroundFileChange,
    uploadFile: uploadBackgroundFile,
    previewUrl: backgroundPreviewUrl,
  } = useFileUpload();
  const { setLatLngFromAddress } = useLatLng();

  const handleFormSubmit = async (data: CreatePrintShop) => {
    const logoUrl = await uploadLogoFile();
    const backgroundUrl = await uploadBackgroundFile();

    const formDataWithImages = {
      ...data,
      logoImage: logoUrl,
      backgroundImage: backgroundUrl,
    };

    axios
      .post<CreatePrintShop>('print-shop', formDataWithImages)
      .then((response: any) => {
        enqueueSnackbar('인쇄사가 성공적으로 추가되었습니다.', { variant: 'success' });
        navigate(`/print-shop/${response.data.dataId}`, { replace: true });
      })
      .catch((error) => {
        enqueueSnackbar(`인쇄사 추가 중 오류가 발생했습니다. ${error.message}`, {
          variant: 'error',
        });
      });
  };

  const onCompletePost = (data: any) => {
    setValue('address', data.address);
    setLatLngFromAddress(data.address, setValue);
    setFocus('address');
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const sampleTag = topLevelTags[0];

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3}>
        <Card>
          <CardHeader title="인쇄사 기본 정보" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              {...register('name', {
                required: '상호명은 필수입니다.',
                minLength: {
                  value: 2,
                  message: '상호명은 2글자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 50,
                  message: '상호명은 50글자 이하여야 합니다.',
                },
              })}
              label="상호명"
              placeholder="인쇄사 상호명을 입력하세요"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <FormControl error={Boolean(errors.type)}>
              <InputLabel id="type-label">인쇄사 유형</InputLabel>
              <Controller
                name="type"
                control={control}
                rules={{ required: '인쇄사 유형은 필수입니다.' }}
                render={({ field }) => (
                  <Select labelId="type-label" label="인쇄사 유형" {...field}>
                    <MenuItem value="인쇄사">인쇄사</MenuItem>
                    <MenuItem value="인쇄 기획사">인쇄 기획사</MenuItem>
                  </Select>
                )}
              />
              {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
            </FormControl>
            <TextField
              {...register('phone', { required: '전화번호는 필수입니다.' })}
              label="전화번호"
              placeholder="인쇄사의 전화번호를 입력하세요"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
            <TextField
              {...register('email', { required: '이메일은 필수입니다.' })}
              type="email"
              label="이메일"
              placeholder="인쇄사의 이메일을 입력하세요"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              {...register('businessHours', { required: '영업시간은 필수입니다.' })}
              label="영업시간"
              placeholder="예: 월-금: 09:00-18:00, 토: 10:00-14:00"
              error={Boolean(errors.businessHours)}
              helperText={errors.businessHours?.message || '요일별 영업시간을 입력하세요'}
              fullWidth
            />
            <TextField
              {...register('homepage')}
              type="url"
              label="홈페이지"
              placeholder="인쇄사의 홈페이지 주소를 입력하세요"
              error={Boolean(errors.homepage)}
              helperText={errors.homepage?.message}
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
              label="한 줄 소개글"
              placeholder="인쇄사에 대한 한 줄 소개글을 입력하세요"
              error={Boolean(errors.introduction)}
              helperText={errors.introduction?.message}
            />
          </Stack>
        </Card>

        <Card>
          <CardHeader title="인쇄사 이미지 등록" />
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
              <FormLabel>로고 이미지</FormLabel>
              {logoPreviewUrl && (
                <Avatar
                  src={logoPreviewUrl}
                  alt="Logo Preview"
                  sx={{ width: '100%', height: 'auto' }}
                  variant="rounded"
                />
              )}
              <FileUploadButton onChange={handleLogoFileChange}>로고 이미지 선택</FileUploadButton>
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
              <FormLabel>배경 이미지</FormLabel>
              {backgroundPreviewUrl && (
                <Avatar
                  src={backgroundPreviewUrl}
                  alt="Background Preview"
                  sx={{ width: '100%', height: 'auto' }}
                  variant="rounded"
                />
              )}
              <FileUploadButton onChange={handleBackgroundFileChange}>
                배경 이미지 선택
              </FileUploadButton>
            </Paper>
          </Stack>
        </Card>

        <Card>
          <CardHeader title="인쇄사 위치 정보" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
              <Box sx={{ p: '14px' }}>
                <Alert severity="info">
                  여기서 주소를 검색하면 아래에 주소가 자동으로 입력됩니다.
                </Alert>
              </Box>
              <Divider />
              <DaumPostcode
                style={postCodeStyle}
                onComplete={onCompletePost}
                autoClose={false}
                focusInput={false}
              />
            </Paper>

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
              placeholder="인쇄사의 주소를 입력하세요"
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                {...register('latitude', {
                  required: '위도는 필수입니다.',
                  pattern: {
                    value: /^[-]?[0-9]+([.][0-9]+)?$/,
                    message: '위도 형식이 올바르지 않습니다.',
                  },
                })}
                label="위도"
                placeholder="인쇄사의 위도를 입력하세요"
                error={Boolean(errors.latitude)}
                helperText={errors.latitude?.message}
                InputProps={{ readOnly: true }}
                fullWidth
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
                placeholder="인쇄사의 경도를 입력하세요"
                error={Boolean(errors.longitude)}
                helperText={errors.longitude?.message}
                InputProps={{ readOnly: true }}
                fullWidth
              />
            </Stack>
          </Stack>
        </Card>

        <Card>
          <CardHeader title="인쇄사에서 제공하는 인쇄 방식" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {sampleTag && (
                <FormControl key={sampleTag.id} fullWidth error={Boolean(errors.tagIds)}>
                  <InputLabel>인쇄 방식</InputLabel>
                  <Controller
                    name="tagIds"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="인쇄 방식"
                        multiple
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected as number[]).map((value) => {
                              const item = flattenTags(tagHierarchies[sampleTag.id] || []).find(
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
                        {flattenTags(tagHierarchies[sampleTag.id] || [])
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
