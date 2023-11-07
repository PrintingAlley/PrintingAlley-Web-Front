import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { HOST_API } from 'src/config-global';
import { GetUserResponse, UserInterface } from 'src/types/response.dto';
import axios from 'src/utils/axios';

const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLoginRedirect = (provider: string) => {
    window.location.href = `${HOST_API}/auth/${provider}`;
  };

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    navigate('/');
  };

  const logout = async () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries('user');
    navigate('/');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      saveToken(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async (): Promise<UserInterface> => {
    const response = await axios.get<GetUserResponse>('user');
    if (response.status === 200) {
      return response.data.user;
    }
    throw new Error('유저 정보를 불러오는데 실패했습니다.');
  };

  const withdraw = async () => {
    try {
      await axios.delete('auth/withdrawal');
      logout();
    } catch (error) {
      if (error.response.status === 401) {
        alert('토큰이 만료되었습니다. 다시 로그인 후 시도해주세요.');
      }
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
    logout,
    withdraw,
    isAuthenticated: !!localStorage.getItem('token'),
    isError,
    isLoading,
  };
};

export default useAuth;
