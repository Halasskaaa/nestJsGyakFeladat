import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { NewProduct } from './newProduct.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getFooldal() {
    return {
      title: 'My First NestJS App',
      getProduct: await this.appService.getOrder()
    }
  }

  @Post('/')
  @Render('index')
  async addTransaction(@Body() body: NewProduct) {
    await this.appService.addOrder(
      body.customerName,
      body.product,
      body.billingAddress,
      body.shippingAddnress
    )
    return this.getFooldal()
  }
}
