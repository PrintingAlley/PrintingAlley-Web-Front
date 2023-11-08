import { LoadingButton } from '@mui/lab';
import { Button, Box, Typography, Avatar, Stack, Card, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFUploadAvatar } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import useAuth from 'src/hooks/useAuth';
import AdminMenu from 'src/sections/Admin/AdminMenu';
import { UpdateUser } from 'src/types/user';

export default function MyPage() {
  const { user, handleLogout, withdraw, isLoading, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const methods = useForm<UpdateUser>({
    mode: 'onChange',
    defaultValues: {
      name: user?.name || '',
      profileImage: user?.profileImage || '',
    },
  });

  const {
    reset,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateUser) => {
    await updateUser(data)
      .then(() => {
        enqueueSnackbar('프로필이 성공적으로 수정되었습니다.', { variant: 'success' });
        setEditMode(false);
      })
      .catch((error) => {
        enqueueSnackbar(`프로필 수정 중 오류가 발생했습니다. ${error.message}`, {
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
        setValue('profileImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('profileImage', null);
  }, [setValue]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        profileImage: user.profileImage,
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (editMode) {
      setTimeout(() => setFocus('name'), 100);
    }
  }, [editMode, setFocus]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <Stack spacing={2} my={8}>
      {editMode ? (
        <>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            프로필 수정
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} width={1} sx={{ maxWidth: 400, p: 2.5 }} component={Card}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">썸네일 이미지</Typography>
                <RHFUploadAvatar
                  name="profileImage"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
              <TextField
                {...register('name', {
                  required: '이름은 필수입니다.',
                  minLength: {
                    value: 2,
                    message: '이름은 2글자 이상이어야 합니다.',
                  },
                  maxLength: {
                    value: 200,
                    message: '이름은 200글자 이하여야 합니다.',
                  },
                })}
                label="이름"
                placeholder="이름을 입력하세요"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
                <Button onClick={() => setEditMode(false)} variant="soft" color="primary">
                  취소
                </Button>
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                >
                  저장
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </>
      ) : (
        <>
          <Avatar src={user.profileImage || ''} alt={user.name} sx={{ width: 100, height: 100 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {user.name}님 환영합니다. 👋
          </Typography>
        </>
      )}

      {!editMode && (
        <Box>
          <Button onClick={() => setEditMode(true)} variant="soft" color="primary">
            프로필 수정
          </Button>
        </Box>
      )}

      <Box>
        <Button onClick={handleLogout} variant="soft" color="warning">
          로그아웃
        </Button>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={withdraw} variant="soft" color="error">
          회원탈퇴
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          회원탈퇴 시, 모든 정보가 삭제되며{'\n'}복구할 수 없습니다.
        </Typography>
      </Stack>

      {user.userType === 'ADMIN' && <AdminMenu />}
    </Stack>
  );
}
