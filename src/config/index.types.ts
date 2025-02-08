export interface IConfig {
  app: {
    environment: string;
    frontEndUrl?: string;
    language: string;
    momentTimeZone: string;
    prefix?: string;
  };
  chatwoot: {
    wppConnectUrl: string;
    chatwootUrl: string;
    chatwootToken: string;
    wppConnectKey: string;
  }
}
