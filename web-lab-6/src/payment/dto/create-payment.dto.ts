import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../enum/paymentMethod.enum';
import { PaymentStatus } from '../enum/paymentStatus.enum';
import { IsEnum, IsInt, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsInt()
  amount: number;
}
