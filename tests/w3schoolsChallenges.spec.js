const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');
const Importer = require('mysql-import');

describe('Desafios iniciais', () => {
  let sequelize;

  beforeAll(async () => {
    const {
      MYSQL_USER,
      MYSQL_PASSWORD,
      HOSTNAME
    } = process.env;

    const importer = new Importer(
      { user: MYSQL_USER, password: MYSQL_PASSWORD, host: HOSTNAME }
    );

    await importer.import('./w3schools.sql');

    importer.disconnect();

    sequelize = new Sequelize(
      `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${HOSTNAME}:3306/w3schools`
    );
  });

  afterAll(async () => {
    await sequelize.query('DROP DATABASE w3schools;', { type: 'RAW' });

    sequelize.close();
  });

  describe('Exibe todos os produtos cuja empresa que fez o envio seja `"Speedy Express"` ou `"United Package"`', () => {
    it('Verifica o desafio 8', async () => {
      const challengeQuery = readFileSync('desafio8.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult8');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Exibe todos as pessoas funcionárias que já realizaram algum pedido, mostrando também seu total de pedidos feitos', () => {
    it('Verifica o desafio 9', async () => {
      const challengeQuery = readFileSync('desafio9.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult9');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Exibe todos os produtos que já foram pedidos, que possuem uma média de quantidade nos pedidos registrados acima de `20.00`', () => {
    it('Verifica o desafio 10', async () => {
      const challengeQuery = readFileSync('desafio10.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult10');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });

  describe('Exibe todas as pessoas clientes **que possuem compatriotas**, mostrando a quantidade de compatriotas para cada pessoa cliente', () => {
    it('Verifica o desafio 11', async () => {
      const challengeQuery = readFileSync('desafio11.sql', 'utf8').trim();
      const expectedResult = require('./challengesResults/challengeResult11');

      expect(await sequelize.query(challengeQuery, { type: 'SELECT' })).toEqual(expectedResult);
    });
  });
});
