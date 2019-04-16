import { config } from '../config';

export const authService = () => {
  const endpoint = `${config.apiEndpoint}/auth`;
  const opts = {
    method: 'GET',
    credentials: 'include',
  };

  return fetch(endpoint, opts).then(response => {
    return response;
  });
};
