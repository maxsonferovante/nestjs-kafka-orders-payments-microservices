import { Injectable } from "@nestjs/common";

import { OrderStatus } from '.prisma/client/orders';
import { PrismaService } from "./prisma/prisma/prisma.service";
import { OrderDto } from "./order.dto";

@Injectable()
export class OrdersRepository {
  
  constructor(private prismaService: PrismaService) {}

  async save(data:OrderDto) {
    try {
        return await this.prismaService.order.create({
            data: {
              ...data,
              status: OrderStatus.PENDING,
            },
          });
    } catch (error) {
        console.error(error);
        throw new Error('Error creating order');
    }
  }

  async update(id: number, status: OrderStatus) {
        try {
            return await this.prismaService.order.update({
                where: { id },
                data: { status },
            });
        } catch (error) {
            console.error(error);
            throw new Error('Error updating order');
        }
   }

   async getAll() {
    try {
        return await this.prismaService.order.findMany(
            {
                orderBy: {
                  created_at: 'desc'
                
                }
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Error getting orders');
    } 
  }

  async getOrdersPending() {
    try {
        return await this.prismaService.order.findMany(
            {
                where: {
                    status: OrderStatus.PENDING
                }
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error('Error getting orders pending');
    } 
  }

    async getOrderByID(id: number) {
        try {
            return await this.prismaService.order.findUnique(
                {
                    where: {
                        id
                    }
                }
            );
        } catch (error) {
            console.error(error);
            throw new Error('Error getting order by id');
        } 
    }


    async getOrdersByClientId(client_id: number) {
        try {
            return await this.prismaService.order.findMany(
                {
                    where: {
                        client_id
                    },
                    orderBy: {
                        created_at: 'desc'
                    }
                }
            );
        } catch (error) {
            console.error(error);
            throw new Error('Error getting orders by client id');
        }
    }
}