import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/payment/enum/paymentMethod.enum';
import { PaymentStatus } from 'src/payment/enum/paymentStatus.enum';
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
