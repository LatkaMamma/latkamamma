import LogtoClient from '@logto/next';

export const logtoClient = new LogtoClient({
  appId: 'M0e50Ks3x0OGxAPpaDuJL',
  appSecret: process.env.LOGTO_APP_SECRET,
  endpoint: 'https://logto.latkamamma.fi', // E.g. http://localhost:3001
  baseUrl: 'http://localhost:3000', // E.g. http://localhost:3000
  cookieSecret: process.env.LOGTO_COOKIE_SECRET!,
  cookieSecure: process.env.NODE_ENV === 'production',
});