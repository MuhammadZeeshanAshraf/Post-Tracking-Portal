import dotenv from 'dotenv';

dotenv.config();

// const knexConfigrations = {
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     user: 'postgres',
//     password: 'root',
//     database: 'postgres'
//   }
// };

const knexConfigrations = {
  client: 'mysql2',
  connection: {
    host: '194.233.89.214',
    port: 3306,
    user: 'gqowoizl_logistics',
    password: '4*zx7#r?ESaI',
    database: 'gqowoizl_logistics'
  }
};

export default knexConfigrations;
