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
    const res = request(app)
      .post('/api/v1/orders')
      .send({ quantity: 3 });
    expect(res.body).toEqual({ id: '1', quantity: 3 });
  });
});
