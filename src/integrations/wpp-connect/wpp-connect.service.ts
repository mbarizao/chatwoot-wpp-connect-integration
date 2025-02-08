import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import configuration from 'src/config';

@Injectable()
export class WppConnectService {
  private readonly logger = new Logger(WppConnectService.name);
  private readonly wppConnectUrl = configuration().chatwoot.wppConnectUrl;
  private readonly chatwootUrl = configuration().chatwoot.chatwootUrl;
  private readonly chatwootToken = configuration().chatwoot.chatwootToken;
  private readonly wppConnectKey = configuration().chatwoot.wppConnectKey;

  constructor(private readonly httpService: HttpService) {}

  /**
   * Gera Token Dinâmico para autenticação no WPPConnect
   */
  async generateWppToken(channelKey: string): Promise<string> {
    const url = `${this.wppConnectUrl}/api/${channelKey}/${this.wppConnectKey}/generate-token`;
    try {
      const response = await lastValueFrom(this.httpService.post(url));
      const token = response.data?.token;
      if (!token) {
        throw new Error('Token não foi gerado corretamente.');
      }
      this.logger.debug(`Token gerado com sucesso para o canal ${channelKey}`);
      return token;
    } catch (error) {
      this.logger.error(`Erro ao gerar Token: ${error.message}`);
      throw error;
    }
  }

  /**
   * Inicia uma sessão no WPPConnect
   */
  async startWppSession(channelKey: string, inboxId: number, accountId: number): Promise<any> {
    const token = await this.generateWppToken(channelKey);
    const url = `${this.wppConnectUrl}/api/${channelKey}/start-session`;

    const payload = {
      webhook: null,
      waitQrCore: true,
      chatWoot: {
        enable: true,
        baseURL: this.chatwootUrl,
        token: this.chatwootToken,
        inbox_id: inboxId,
        account_id: accountId,
      },
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, payload, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      this.logger.debug(`Sessão iniciada com sucesso para ${channelKey}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Erro ao iniciar sessão: ${error.message}`);
      throw error;
    }
  }
}