import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CurrencyExchangeService } from './currency_exchange.service';
import { TransactionDto } from './dtos/currency_exchange.dto';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('currency_exchange')
export class CurrencyExchangeController {
  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('exchange-rate')
  @Get('/exchange_rate')
  async getExchangeRate(): Promise<number> {
    return await this.currencyExchangeService.getExchangeRate();
  }

  @Post('/new_transaction')
  postNewTransaction(@Body() transaction: TransactionDto) {
    this.currencyExchangeService.postNewTransaction(transaction);
  }
}
