import { config } from '../config';

export const loginService = req => {
  const endpoint = `${config.apiEndpoint}/signin`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(req.user),
  };

  return fetch(endpoint, opts)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return json;
    });
};
