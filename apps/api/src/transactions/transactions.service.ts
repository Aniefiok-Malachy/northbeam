import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly accounts: AccountsService,
  ) {}

  async listForUser(userId: string) {
    const account = await this.accounts.findByUserId(userId);
    return this.prisma.transaction.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createForUser(userId: string, dto: CreateTransactionDto) {
    const account = await this.accounts.findByUserId(userId);
    const signedAmount = dto.type === 'CREDIT' ? dto.amountCents : -dto.amountCents;

    return this.prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          accountId: account.id,
          description: dto.description,
          amountCents: dto.amountCents,
          type: dto.type,
          counterparty: dto.counterparty,
          status: 'POSTED',
        },
      });

      await tx.account.update({
        where: { id: account.id },
        data: { balanceCents: { increment: signedAmount } },
      });

      return transaction;
    });
  }
}
