export interface IConfig {
  app: {
    environment: string;
    frontEndUrl?: string;
    language: string;
    momentTimeZone: string;
    prefix?: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  },
  chatwoot: {
    wppConnectUrl: string;
    chatwootUrl: string;
    chatwootToken: string;
    wppConnectKey: string;
  }
}
