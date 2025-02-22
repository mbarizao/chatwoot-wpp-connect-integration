import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsObject } from 'class-validator';

class ContactInboxDto {
  @ApiProperty({ example: 66 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 25 })
  @IsNumber()
  contact_id: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  inbox_id: number;

  @ApiProperty({ example: '5511999999999' })
  @IsString()
  source_id: string;
}

class MessageDto {
  @ApiProperty({ example: 303 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: '/start hello_world' })
  @IsString()
  content: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  account_id: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  inbox_id: number;

  @ApiProperty({ example: 46 })
  @IsNumber()
  conversation_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  message_type: number;

  @ApiProperty({ example: 'sent' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'User' })
  @IsString()
  sender_type: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  sender_id: number;

  @ApiProperty({ example: { contact_inbox: { source_id: '5511999999999' } } })
  @IsObject()
  conversation: { contact_inbox: { source_id: string } };
}

class MetaSenderDto {
  @ApiProperty({ example: 'WPP Connect' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+5511999999999' })
  @IsString()
  phone_number: string;
}

class MetaDto {
  @ApiProperty({ type: MetaSenderDto })
  @IsObject()
  sender: MetaSenderDto;
}

export class ChatwootWebhookDto {
  @ApiProperty({ type: ContactInboxDto })
  @IsObject()
  contact_inbox: ContactInboxDto;

  @ApiProperty({ example: 10 })
  @IsNumber()
  inbox_id: number;

  @ApiProperty({ type: [MessageDto] })
  @IsObject()
  messages: MessageDto[];

  @ApiProperty({ type: MetaDto })
  @IsObject()
  meta: MetaDto;
}
