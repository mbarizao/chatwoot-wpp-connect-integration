import { IConfig } from 'src/config/index.types';

const configuration = (): IConfig => ({
  app: {
    environment: process.env.NODE_ENV,
    language: 'pt',
    momentTimeZone: 'America/Sao_Paulo',
  },
  chatwoot: {
    wppConnectUrl: process.env.WPP_CONNECT_URL,
    chatwootUrl: process.env.CHATWOOT_URL,
    chatwootToken: process.env.CHATWOOT_TOKEN,
    wppConnectKey: process.env.WPP_CONNECT_KEY,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME ,
  }
});

export default configuration;
