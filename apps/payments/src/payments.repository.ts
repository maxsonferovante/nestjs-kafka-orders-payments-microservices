import { Injectable } from "@nestjs/common";
import { PaymentStatus } from '.prisma/client/payments';
import { PrismaService } from "./prisma/prisma/prisma.service";
import { PaymentDto } from "./payment.dto";


@Injectable()
export class PaymentsRepository {
  
  constructor(private prismaService: PrismaService) {}

  async save(data:PaymentDto, status: PaymentStatus) {
    try {
        return await this.prismaService.payment.create({
            data: {
              ...data,
              status: status,
            },
          });
    } catch (error) {
        console.error(error);
        throw new Error('Error creating payment');
    }
  }

  async getAll() {
    try {
        return await this.prismaService.payment.findMany(
            {
                orderBy: {
                  created_at: 'desc'
                
                }
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Error getting payments');
    } 
  }
}