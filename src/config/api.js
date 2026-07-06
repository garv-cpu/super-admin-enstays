export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8000/api/v1';

export const TOKEN_STORAGE_KEY = 'enstays_super_admin_access_token';
export const USER_STORAGE_KEY = 'enstays_super_admin_user';