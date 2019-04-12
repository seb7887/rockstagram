import { config } from '../config';

export const authService = () => {
  const endpoint = `${config.apiEndpoint}/auth`;
  const opts = {
    method: 'POST',
    credentials: 'include',
  };

  return fetch(endpoint, opts)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};
