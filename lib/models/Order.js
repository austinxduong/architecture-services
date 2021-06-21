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

}
