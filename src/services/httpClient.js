import { API_BASE_URL, TOKEN_STORAGE_KEY } from '../config/api';

function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function normalizeError(payload, response) {
  const message =
    payload?.message ||
    payload?.error?.message ||
    response?.statusText ||
    'Request failed';

  const error = new Error(message);
  error.status = response?.status;
  error.payload = payload;
  error.code = payload?.error?.code;
  return error;
}

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = new Headers(options.headers || {});

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    body:
      options.body && !isFormData && typeof options.body !== 'string'
        ? JSON.stringify(options.body)
        : options.body,
  });

  const text = await response.text();

  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { success: false, message: text || 'Invalid JSON response' };
  }

  if (!response.ok || payload?.success === false) {
    throw normalizeError(payload, response);
  }

  return payload?.data ?? payload;
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: 'POST', body }),
  patch: (path, body) => apiRequest(path, { method: 'PATCH', body }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body }),
  delete: (path) => apiRequest(path, { method: 'DELETE' }),
};