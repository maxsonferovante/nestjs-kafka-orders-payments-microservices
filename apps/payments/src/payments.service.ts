import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { PaymentStatus } from '.prisma/client/payments';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PaymentsRepository } from './payments.repository';

@Injectable()
export class PaymentsService {
  constructor(
    private paymentsRepository: PaymentsRepository,
    @Inject('PAYMENTS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async all() {
    return await this.paymentsRepository.getAll();
  }

  async payment(data: PaymentDto) {

    /* 
     Simula a aprovação ou rejeição do pagamento
     */
  
    const random = Math.floor(Math.random() * 100);
    let status: PaymentStatus;
   
    if (random % 2 === 0) {
      status = PaymentStatus.APPROVED;
    } else {
      status = PaymentStatus.REJECTED;
    }
   
    const payment = await this.paymentsRepository.save(data, status);
    
    await lastValueFrom(this.kafkaClient.emit('payments', payment));
    
    return payment;
  }
}
