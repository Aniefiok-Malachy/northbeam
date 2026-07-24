import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  /** Called right after a new user is created — every user starts with one operating account. */
  async createDefaultAccount(userId: string) {
    return this.prisma.account.create({
      data: {
        userId,
        name: 'Operating account',
        accountNumber: this.generateAccountNumber(),
        balanceCents: 0,
      },
    });
  }

  async findByUserId(userId: string) {
    const account = await this.prisma.account.findFirst({ where: { userId } });
    if (!account) throw new NotFoundException('No account found for this user');
    return account;
  }

  private generateAccountNumber() {
    return String(randomInt(100000000, 999999999));
  }
}
