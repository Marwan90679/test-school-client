import axios from 'axios';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext)

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      res => res,
      async error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          navigate('/signIn');
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;