import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransationDTO): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance().total;
      if (value > balance) {
        throw Error('Saldo invalido!');
      }
    }
    const createTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return createTransaction;
  }
}

export default CreateTransactionService;
