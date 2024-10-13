import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ExchangeRate, ExchangeTransaction } from './currency_exchange.types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { prisma } from '../../prisma/prisma-client';

const API_URL = 'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';

@Injectable()
export class CurrencyExchangeService {
  private readonly logger = new Logger(CurrencyExchangeService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getExchangeRate(): Promise<number> {
    const cachedData = await this.cacheService.get<number | undefined>(
      'exchange-rate',
    );

    if (cachedData) {
      return cachedData;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<ExchangeRate>(API_URL, {
          headers: {
            'x-api-key': process.env.API_KEY,
            'content-type': 'application/json',
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'Ooopsi, an error!';
          }),
        ),
    );

    await this.cacheService.set('exchange-rate', data.exchange_rate);
    return data.exchange_rate;
  }

  async postNewTransaction(transaction: ExchangeTransaction) {
    await prisma.transaction.create({ data: transaction });
  }
}
