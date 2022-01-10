import dotenv from 'dotenv';

dotenv.config();

const knexConfigrations = {
  client: process.env.DB_CLIENT,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB_CONNECTION_STRING
  }
};

export default knexConfigrations;
