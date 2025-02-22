import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChatwootWebhookParamDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'hello_world', description: 'Este campo será utilizado como identificador da sua conta na integração.' })
  accountName: string;
}