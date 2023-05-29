const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
  timeout: 60000,
});

client.connect();

exports.query = async (query, values) => {
  try {
    const { rows } = await client.query(query, values);
    return rows;
  } catch (error) {
    console.log(`Error de conexão com a db${error}`);
  }
};
