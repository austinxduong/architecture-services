import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('it posts a new order and sends a SMS text', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 3 });
    expect(res.body).toEqual({ id: '1', quantity: 3 });
  });
  it('it gets a new order and sends a SMS text', async () => {
    const order1 = await Order.insert({ 
      quantity: 3
    });

    const order2 = await Order.insert({
      quantity: 2
    });

    const order3 = await Order.insert({
      quantity: 1
    });
    const res = await request(app)
      .get('/api/v1/orders');
    expect(res.body).toEqual([order1, order2, order3]);
  });
});

