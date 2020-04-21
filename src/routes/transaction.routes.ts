import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const payload = {
      transactions,
      balance,
    };
    response.json(payload);
    return payload;
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const CreateTransaction = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = CreateTransaction.execute({ value, title, type });
    response.json(transaction);
    return transaction;
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
