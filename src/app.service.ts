import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Product } from './product.js';
import { NewProduct } from './newProduct.dto.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'orders'
})

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getOrder() {
    const [results] = await mysqlConnection.execute(
      'SELECT * from ORDERS;',
    )
    const rows = results as Product[];
    return rows;
  }

  async addOrder(product: string,customerName: string,billingAddress: string,shippingAddnress: string;) {
    const [results] = await mysqlConnection.execute(
      'INSERT INTO orders (product,customerName,billingAddress,shippingAddnress) VALUES (?,?,?,?)',
      [product,customerName,billingAddress,shippingAddnress]
    )
    const rows = results as any;
    return {
      id: rows.insertId,
      product,
      customerName,
      billingAddress,
      shippingAddnress
    } as NewProduct;
  }

}
