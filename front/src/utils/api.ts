import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import auth from '@/components/common/auth';
import type { User } from 'firebase/auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
});

const getUser = async (): Promise<User | null> => {
  return new Promise(resolve => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
    } else {
      auth.onAuthStateChanged(user => {
        resolve(user);
      });
    }
  });
};

api.interceptors.request.use(
  async config => {
    const user = await getUser();
    const idToken = await user?.getIdToken(true);
    // console.log('user', { user, idToken });
    if (idToken) {
      config.headers['Authorization'] = `Bearer ${idToken}`;
    }
    // console.log('user config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

interface CustomAxiosResponse<T> extends AxiosResponse<T> {
  error?: string | null;
  ok?: boolean;
}

async function request<T>(
  config: AxiosRequestConfig
): Promise<CustomAxiosResponse<T>> {
  // console.log(`${config.method} 요청: ${config.url}`);

  try {
    // console.log('options : ', config);
    const response = await api.request<T>(config);
    return response;
  } catch (error) {
    // console.error(`${config.method} 요청 ERROR`, error);
    throw error;
  }
}

type AxiosRequestConfigWithoutMethodAndUrl = Omit<
  AxiosRequestConfig,
  'method' | 'url'
>;

function get<T>(
  endpoint: string,
  options?: AxiosRequestConfigWithoutMethodAndUrl
): Promise<CustomAxiosResponse<T>> {
  return request<T>({ method: 'GET', url: endpoint, ...options });
}

function post<T>(
  endpoint: string,
  data: unknown,
  options?: AxiosRequestConfigWithoutMethodAndUrl
): Promise<CustomAxiosResponse<T>> {
  return request<T>({ method: 'POST', url: endpoint, data, ...options });
}

function patch<T>(
  endpoint: string,
  data: unknown,
  options?: AxiosRequestConfigWithoutMethodAndUrl
): Promise<CustomAxiosResponse<T>> {
  return request<T>({ method: 'PATCH', url: endpoint, data, ...options });
}

function del<T>(
  endpoint: string,
  options?: AxiosRequestConfigWithoutMethodAndUrl
): Promise<CustomAxiosResponse<T>> {
  return request<T>({ method: 'DELETE', url: endpoint, ...options });
}

export { get, post, patch, del as delete };
