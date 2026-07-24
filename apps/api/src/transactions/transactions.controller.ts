import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transactions')
@ApiBearerAuth()
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  list(@Req() req: Request & { user: { userId: string } }) {
    return this.transactionsService.listForUser(req.user.userId);
  }

  @Post()
  create(
    @Req() req: Request & { user: { userId: string } },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionsService.createForUser(req.user.userId, dto);
  }
}
