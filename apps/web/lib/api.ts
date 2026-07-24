import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const api = axios.create({ baseURL });

// Separate, un-intercepted client for the refresh call itself — using `api`
// here would recurse into the same 401 handler below.
const refreshClient = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const { data } = await refreshClient.post<AuthTokens>('/auth/refresh', { refreshToken });
    storeTokens(data);
    return data.accessToken;
  } catch {
    clearTokens();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (typeof error.config & { _retried?: boolean }) | undefined;

    if (error.response?.status === 401 && original && !original._retried) {
      original._retried = true;

      // Multiple requests can 401 at once — share one refresh call between them.
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });

      const newToken = await refreshPromise;
      if (newToken) {
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      }

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export interface Transaction {
  id: string;
  description: string;
  amountCents: number;
  type: 'CREDIT' | 'DEBIT';
  status: 'PENDING' | 'POSTED' | 'FAILED';
  createdAt: string;
}

export interface Account {
  id: string;
  name: string;
  accountNumber: string;
  balanceCents: number;
  currency: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function storeTokens(tokens: AuthTokens) {
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

/** Clears tokens and sends the user back to /login. Use from a client component or event handler. */
export function logout() {
  clearTokens();
  window.location.href = '/login';
}

export async function registerUser(input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthTokens> {
  const { data } = await api.post('/auth/register', input);
  return data;
}

export async function loginUser(input: { email: string; password: string }): Promise<AuthTokens> {
  const { data } = await api.post('/auth/login', input);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get('/users/me');
  return data;
}

export async function fetchAccount(): Promise<Account> {
  const { data } = await api.get('/accounts/me');
  return data;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const { data } = await api.get('/transactions');
  return data;
}
