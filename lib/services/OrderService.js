import dotenv from 'dotenv';
import Order from '../models/Order';
import { sendSms } from '../utils/twilio.js';
dotenv.config();

export default class OrderService{
  static async create({ quantity }){
    const order = await Order.insert({ quantity });
    await sendSms( 
      process.env.ORDER_HANDLER_NUMBER,
      `made a new order ${quantity}`
    );

    return order;
  }
}
