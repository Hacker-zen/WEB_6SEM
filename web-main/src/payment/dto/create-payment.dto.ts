export class CreatePaymentDto {
  id: string;
  orderId: string;
  paymentMethod: string;
  paymentStatus: string;
  amount: number;
}
