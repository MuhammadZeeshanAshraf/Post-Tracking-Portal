import dotenv from 'dotenv';

dotenv.config();

const knexConfigrations = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'naeem',
    password: 'admin',
    database: 'postgres'
  }
};

export default knexConfigrations;
