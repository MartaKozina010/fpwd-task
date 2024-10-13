import { Module } from '@nestjs/common';
import { CurrencyExchangeController } from './currency_exchange.controller';
import { CurrencyExchangeService } from './currency_exchange.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CurrencyExchangeController],
  providers: [CurrencyExchangeService],
})
export class CurrencyExchangeModule {}
