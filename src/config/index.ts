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
  }
});

export default configuration;
