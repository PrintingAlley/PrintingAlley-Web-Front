import { uploadFileAndGetUrl } from 'src/utils/upload';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { HOST_API } from 'src/config-global';
import { GetUserResponse, UserInterface } from 'src/types/response.dto';
import { UpdateUser } from 'src/types/user';
import axios from 'src/utils/axios';

const useAuth = () => {
  const queryClient = useQueryClient();

  const handleLoginRedirect = (provider: string) => {
    window.location.href = `${HOST_API}/auth/${provider}`;
  };

  const handleLogout = () => {
    if (!window.confirm('로그아웃 하시겠습니까?')) return;
    logout();
  };

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
  };

  const logout = async () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries('user');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      saveToken(token);
    }
  }, []);

  const fetchUser = async (): Promise<UserInterface> => {
    const response = await axios.get<GetUserResponse>('user');
    if (response.status === 200) {
      return response.data.user;
    }
    throw new Error('유저 정보를 불러오는데 실패했습니다.');
  };

  const withdraw = async () => {
    if (!window.confirm('회원탈퇴 하시겠습니까?\n탈퇴 후에는 복구할 수 없습니다.')) return;
    try {
      await axios.delete('auth/withdrawal');
      logout();
    } catch (error) {
      if (error.statusCode === 401) {
        alert('토큰이 만료되었습니다. 다시 로그인 후 시도해주세요.');
      }
    }
  };

  const updateUser = async (data: UpdateUser) => {
    let profileImageUrl = data.profileImage;
    if (profileImageUrl instanceof File) {
      profileImageUrl = await uploadFileAndGetUrl(profileImageUrl);
    }

    const formDataWithImages = {
      ...data,
      profileImage: profileImageUrl,
    };

    const response = await axios.put<UpdateUser>('user', formDataWithImages);
    if (response.status === 200) {
      queryClient.invalidateQueries('user');
    }
  };

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<UserInterface, Error>('user', fetchUser, {
    enabled: !!localStorage.getItem('token'),
    retry: false,
    onError: () => {
      logout();
    },
  });

  return {
    user,
    handleLoginRedirect,
    handleLogout,
    withdraw,
    isAuthenticated: !!localStorage.getItem('token'),
    isError,
    isLoading,
    updateUser,
  };
};

export default useAuth;
