import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private odersRepository: OrdersRepository,
    @Inject('ORDERS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  async getOrderByID(id: number) {
    return await this.odersRepository.getOrderByID(id);
  }

  async getOrdersByClientId(id: number) {
    return await this.odersRepository.getOrdersByClientId(id);
  }

  async all() {
    return await this.odersRepository.getAll();
  }

  async create(data: OrderDto) {  
    const order = await this.odersRepository.save(data);
    await lastValueFrom(this.kafkaClient.emit('orders', order));
    return order;
  }

  async complete(id: number, status: OrderStatus) {
    return await this.odersRepository.update(id, status);
  }
  
  async sendOrdersPending() {
    const orders = await this.odersRepository.getOrdersPending();
    orders.forEach(async order => {
      await lastValueFrom(this.kafkaClient.emit('orders', order));
    });
    if (orders.length > 0) {
      return { message: 'Orders sent to payment service',
               orders: orders.map(order => order.id)
       };
    }
    return { message: 'No orders to send' };
  }
}

