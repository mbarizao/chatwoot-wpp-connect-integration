import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WppConnectService } from './wpp-connect.service';
import { ChatwootWebhookDto } from './dto/chatwoot-webhook.dto';

@Controller('webhook')
@ApiTags('webhook')
export class WppConnectController {
  private readonly logger = new Logger(WppConnectController.name);
  constructor(private readonly wppConnectService: WppConnectService) {}

  @Post('chatwoot')
  @ApiOperation({ summary: 'Recebe mensagens do Chatwoot e inicia sessão' })
  async handleChatwootMessage(@Body() body: ChatwootWebhookDto) {
    try {
      this.logger.debug('Recebendo webhook do Chatwoot');

      const messageContent = body.messages[0]?.content?.trim();
      if (!messageContent || !messageContent.startsWith('/start ')) {
        throw new Error('Comando inválido. Use /start nome-do-canal');
      }

      const channelKey = messageContent.split(' ')[1];
      if (!channelKey) {
        throw new Error('Falta o nome do canal no comando.');
      }

      const senderPhoneNumber = body.meta?.sender?.phone_number;
      if (!senderPhoneNumber) {
        throw new Error('Número de telefone inválido.');
      }

      const allowedNumbers = ['+5511999999999'];
      if (!allowedNumbers.includes(senderPhoneNumber)) {
        this.logger.warn(`Acesso negado para: ${senderPhoneNumber}`);
        return { status: 'denied', message: 'Número não autorizado' };
      }

      const inboxId = body.messages[0].inbox_id;
      const accountId = body.messages[0].account_id;

      this.logger.debug('Iniciando a sessão');
      await this.wppConnectService.startWppSession(channelKey, inboxId, accountId);

      return { status: 'success', message: 'Sessão iniciada com sucesso.' };
    } catch (error) {
      this.logger.error(`Erro no webhook: ${error.message}`);
      return { status: 'error', message: error.message };
    }
  }
}
