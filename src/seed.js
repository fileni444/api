// src/seed.js
const connection = require('./config/db');

// Função para popular a tabela de clientes
const popularClientes = () => {
  const clientes = [
    { nome: 'Carlos Lima', email: 'carlos@email.com', telefone: '11988887777', data_nascimento: '1990-10-10', endereco: 'Rua Exemplo, 123' },
    { nome: 'Maria Silva', email: 'maria@email.com', telefone: '11999998888', data_nascimento: '1995-02-25', endereco: 'Rua Boa, 456' },
    { nome: 'João Pereira', email: 'joao@email.com', telefone: '11977776666', data_nascimento: '1980-07-15', endereco: 'Rua Nova, 789' },
  ];

  clientes.forEach(cliente => {
    connection.query(
      'INSERT INTO clientes (nome, email, telefone, data_nascimento, endereco) VALUES (?, ?, ?, ?, ?)',
      [cliente.nome, cliente.email, cliente.telefone, cliente.data_nascimento, cliente.endereco],
      (err, result) => {
        if (err) return console.error('Erro ao inserir cliente:', err);
        console.log('Cliente inserido com sucesso: ', cliente.nome);
      }
    );
  });
};

// Função para popular a tabela de agendamentos
const popularAgendamentos = () => {
  const agendamentos = [
    { cliente_id: 1, data_agendamento: '2023-05-01 10:00:00', procedimento: 'Limpeza' },
    { cliente_id: 2, data_agendamento: '2023-06-10 14:00:00', procedimento: 'Restauração' },
    { cliente_id: 3, data_agendamento: '2023-07-20 16:30:00', procedimento: 'Exame' },
  ];

  agendamentos.forEach(agendamento => {
    connection.query(
      'INSERT INTO agendamentos (cliente_id, data_agendamento, procedimento) VALUES (?, ?, ?)',
      [agendamento.cliente_id, agendamento.data_agendamento, agendamento.procedimento],
      (err, result) => {
        if (err) return console.error('Erro ao inserir agendamento:', err);
        console.log('Agendamento inserido com sucesso: ', agendamento.procedimento);
      }
    );
  });
};

// Chamar as funções para popular os dados
popularClientes();
popularAgendamentos();
