import { config } from '../config';

export const registerUserService = req => {
  const endpoint = `${config.apiEndpoint}/users`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
