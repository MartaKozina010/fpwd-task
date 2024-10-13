import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  @IsNotEmpty()
  eurAmount: number;

  @IsNumber()
  @IsNotEmpty()
  plnAmount: number;

  @IsNumber()
  @IsNotEmpty()
  exchangeRate: number;
}
