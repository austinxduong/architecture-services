import pool from '../utils/pool';

export default class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }
  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *', [quantity]
    );
    return new Order(rows[0]);
  }

  static async allOrder() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM orders
      `);
    return rows.map(findAll => new Order(findAll));
  }


  static async singleOrder(id) {
    const { rows } = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    return new Order(rows[0]);

  }

  static async updateOrder({ id, quantity }) {
    const { rows } = await pool.query(
      'UPDATE orders SET quantity = $2 WHERE id = $1 RETURNING *',
      [id, quantity]
    );
    return new Order(rows[0]);
  }

}
