/**
 * Configuração da conexão com o banco de dados MariaDB/MySQL
 *
 * Utiliza variáveis de ambiente para não expor credenciais no código.
 * Em produção na AWS, o DB_HOST apontará para o endpoint do RDS.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool de conexões: reutiliza conexões abertas em vez de criar uma nova
// a cada requisição — essencial para performance em produção.
const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'credito_db',
  waitForConnections: true,
  connectionLimit: 10,       // máximo de conexões simultâneas no pool
  queueLimit: 0,             // fila ilimitada de requisições aguardando conexão
  timezone: 'Z',             // UTC — evita bugs de fuso horário
});

// Testa a conexão ao inicializar a aplicação
pool.getConnection()
  .then(conn => {
    console.log('✅ Banco de dados conectado com sucesso!');
    conn.release(); // devolve a conexão ao pool
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // encerra a aplicação se não conseguir conectar
  });

module.exports = pool;
