import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderStatus } from '.prisma/client/orders';

@Controller('orders')
export class OrdersController{
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrderByID(@Query('order_id', ParseIntPipe) id: number) {

    return this.ordersService.getOrderByID(id);
  }
  
  @Get('client/:client_id')
  async getOrderByClientID(@Param('client_id', ParseIntPipe) client_id: number) {
    return await this.ordersService.getOrdersByClientId(client_id);
  }

  @Get('all')
  async all() {
    return await this.ordersService.all();
  }

  @Post()
  async create(@Body() data: OrderDto) {
    return await this.ordersService.create(data);
  }

  @Post('send-orders-pending')
  async sendOrdersPending() {
    const ordens = await this.ordersService.sendOrdersPending();
    return ordens;
  }

  @MessagePattern('payments')
  async complete(@Payload() message) {
    await this.ordersService.complete(
      message.order_id,
      message.status === 'APPROVED' ? OrderStatus.PAYED : OrderStatus.CANCELLED,
    );
  }

}
