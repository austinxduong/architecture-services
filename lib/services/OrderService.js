import dotenv from 'dotenv';
import Order from '../models/Order';
import { sendSms } from '../utils/twilio.js';
dotenv.config();

export default class OrderService {
  static async create({ quantity }) {
    const order = await Order.insert({ quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New order received for ${quantity} items.`
    );
    return order;
  }

  static async findAll() {
    const order = await Order.allOrder();
    await order.forEach(item => { 
      sendSms(
        process.env.ORDER_HANDLER_NUMBER, 
        `Order ${item.id} Received for ${item.quantity} items`);
    });
    return order;
  }

  static async findById(orderId) {
    const order = await Order.singleOrder(orderId);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order found for ${order.id, order.quantity} .`
    );
    return order;
  }

  static async updateId ({ id, quantity }) {
    const order = await Order.updateOrder({ id, quantity });
    await sendSms (
      process.env.ORDER_HANDLER_NUMBER,
      `Updated order for ${order.id, order.quantity}`
    );
    return order;
  }
}
