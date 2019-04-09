const dev = process.env.NODE_ENV !== 'production';

export const config = {
  prodUrl: dev ? '' : '/rockstagram',
  apiEndpoint: dev ? 'http://localhost:7777/api' : '',
};
