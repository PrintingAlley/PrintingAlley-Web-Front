// useAuth.ts
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { HOST_API } from 'src/config-global';
import axios from 'src/utils/axios';

interface User {
  name: string;
  email: string;
  profileImage?: string;
  provider: string;
}

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
      const response = await axios.get('user');
      return response.data;
    } catch (error) {
      throw new Error('Unauthorized');
    }
  };

  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<User>('user', fetchUser, {
    enabled: !!localStorage.getItem('token'),
    retry: false,
  });

  return {
    user,
    handleLoginRedirect,
    logout,
    isAuthenticated: !!localStorage.getItem('token'),
    isError,
    isLoading,
  };
};

export default useAuth;
