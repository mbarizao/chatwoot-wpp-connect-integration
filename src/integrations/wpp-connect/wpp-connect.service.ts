import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Integration } from 'src/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WppConnectService {
  private readonly logger = new Logger(WppConnectService.name);

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Integration)
    private readonly repository: Repository<Integration>,
  ) {}

  // Gera Token Dinâmico para autenticação no WPPConnect 
  private async generateWppToken(
    channelKey: string,
    wppConnectUrl: string,
    wppConnectKey: string,
  ): Promise<string> {
    const url = `${wppConnectUrl}/api/${channelKey}/${wppConnectKey}/generate-token`;
    try {
      const response = await this.httpService.axiosRef.post(url);

      const token = response.data?.token;
      if (!token) {
        throw new Error('Token não foi gerado corretamente.');
      }
      this.logger.debug(`Token gerado com sucesso para o canal ${channelKey}`);
      return token;
    } catch (error) {
      this.logger.error(
        `Erro ao gerar Token: ${error?.response?.data?.message}`,
      );
      throw error;
    }
  }

  // Obtém uma integração usando o critério de accountName
  private async getIntegration(accountName: string): Promise<Integration> {
    const integration = await this.repository.findOneBy({ accountName });
    return integration;
  }

  // Inicia uma sessão no WPPConnect
  public async startWppSession(
    accountName: string,
    channelKey: string,
    inboxId: number,
    accountId: number,
  ): Promise<any> {
    // Obtém todos os dados da integração cadastrados no banco a partir do accountName
    const integration = await this.getIntegration(accountName);

    if (!integration) {
      throw new Error(
        `Integração não encontrada para o inbox "${accountName}"`,
      );
    }

    // Gera o token dinâmico para autenticação no WPPConnect
    const token = await this.generateWppToken(
      channelKey,
      integration.wppConnectUrl,
      integration.wppConnectSecret,
    );

    // URL para iniciar a sessão no WPPConnect
    const url = `${integration.wppConnectUrl}/api/${channelKey}/start-session`;

    const payload = {
      webhook: null,
      waitQrCore: true,
      chatWoot: {
        enable: true,
        baseURL: integration.chatwootUrl,
        token: integration.chatwootToken,
        inbox_id: inboxId,
        account_id: accountId,
      },
    };

    try {
      const response = await this.httpService.axiosRef.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Muda o status da integração
      integration.isActive = true;
      await this.repository.save(integration);

      this.logger.debug(`Sessão iniciada com sucesso para ${channelKey}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Erro ao iniciar sessão: ${error.message}`);
      throw error;
    }
  }
}
