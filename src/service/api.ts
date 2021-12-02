import axios from 'axios';
import { createServer, Model, Registry } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';

export const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://senfinancasserver.vercel.app/api/transaction',
});

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
};

const TransactionModel: ModelDefinition<Transaction> = Model.extend({});

type AppRegistry = Registry<
  {
    transactions: ModelDefinition<Transaction>;
  },
  {}
>;

type AppSchema = Schema<AppRegistry>;

export const fakeApi = () => {
  createServer({
    models: {
      transactions: TransactionModel,
    },
    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: 'Freelance de website',
            type: 'income',
            category: 'Dev',
            amount: 6000,
            createdAt: new Date('2021-12-02 09:00:00'),
          },
          {
            id: 2,
            title: 'Aluguel',
            type: 'outcome',
            category: 'Casa',
            amount: 1100,
            createdAt: new Date('2021-12-02 11:00:00'),
          },
        ],
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/transactions', (schema: AppSchema) => {
        const data = schema.all('transactions');
        return data;
      });

      this.post('/transactions', (schema: AppSchema, request) => {
        const transaction = JSON.parse(request.requestBody);
        return schema.create('transactions', {
          ...transaction,
          createdAt: new Date(),
        });
      });
    },
  });
};
