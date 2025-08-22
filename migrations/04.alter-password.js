import pg from 'pg';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env');

dotenv.config({ path: envPath });

console.log('Fichier .env chargé depuis:', envPath);
console.log('DB_USER:', process.env.DB_USER ? '***exists***' : 'MISSING!');

const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const alterPasswordColumn = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    await client.query(`
      ALTER TABLE users 
      ALTER COLUMN password TYPE VARCHAR(255);
    `);
    
    console.log('Password column altered successfully to VARCHAR(255)');
  } catch (err) {
    console.error('Error altering password column:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
};

alterPasswordColumn();