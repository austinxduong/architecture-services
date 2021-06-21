import { Router } from 'express';
// import Order from '../models/Order';
import OrderService from '../services/OrderService.js';


export default Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const order = await OrderService.findAll();
      //   console.log(order);
      res.send(order);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.findById(req.params.id);
      res.send(order);
    } catch (error) {
      next(error);  
    }

  })
  .put('/:id', async (req, res, next) => {
    try {
      const order = await OrderService.updateId(req.body);
      res.send(order);
    } catch (error) {
      next(error);
    }
  });




