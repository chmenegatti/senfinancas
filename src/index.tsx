import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
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

    this.get('/transactions', () => {
      const data = this.schema.all('transaction');
      return data;
    });

    this.post('/transactions', (schema, request) => {
      const transaction = JSON.parse(request.requestBody);
      return schema.create('transaction', {
        ...transaction,
        createdAt: new Date(),
      });
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
