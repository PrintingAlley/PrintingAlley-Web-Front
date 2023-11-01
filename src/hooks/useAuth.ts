import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { HOST_API } from 'src/config-global';
import { GetUserResponse, UserInterface } from 'src/types/response.dto';
import axios from 'src/utils/axios';

const useAuth = () => {
  const queryClient = useQueryClient();

  const handleLoginRedirect = (provider: string) => {
    window.location.href = `${HOST_API}/auth/${provider}`;
  };

  const saveToken = (token: string) => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  };

  const logout = async () => {
    localStorage.removeItem('token');
    queryClient.invalidateQueries('user');
    window.location.href = '/';
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      saveToken(token);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get<GetUserResponse>('user');
      return response.data.user;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  };

  const withdraw = async () => {
    try {
      await axios.delete('auth/withdrawal');
      logout();
    } catch (error) {
      throw new Error('Unauthorized');
    }
  };

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<UserInterface>('user', fetchUser, {
    enabled: !!localStorage.getItem('token'),
    retry: false,
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
