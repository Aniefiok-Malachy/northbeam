import { IsEnum, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ description: 'Always a positive integer in cents; sign is set by `type`.' })
  @IsInt()
  @IsPositive()
  amountCents!: number;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type!: TransactionType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  counterparty?: string;
}
