import dotenv from 'dotenv';

dotenv.config();

const knexConfigrations = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'postgres'
  }
};

export default knexConfigrations;
