import pg from 'pg';
import dotenv from 'dotenv';
const { Client } = pg;

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const resetDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Drop all tables in the correct order to avoid dependency issues
    await client.query('DROP TABLE IF EXISTS contains CASCADE;');
    await client.query('DROP TABLE IF EXISTS bookmarks CASCADE;');
    await client.query('DROP TABLE IF EXISTS rating CASCADE;');
    await client.query('DROP TABLE IF EXISTS product_cart CASCADE;');
    await client.query('DROP TABLE IF EXISTS table_order CASCADE;');
    await client.query('DROP TABLE IF EXISTS cart CASCADE;');
    await client.query('DROP TABLE IF EXISTS product CASCADE;');
    await client.query('DROP TABLE IF EXISTS users CASCADE;');

    console.log('All tables dropped successfully');

    // Create the 'users' table
    await client.query(`
      CREATE TABLE users(
        id_user SERIAL PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        user_role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
        street VARCHAR(100) NOT NULL,
        zip_code VARCHAR(10) NOT NULL,
        country VARCHAR(50) NOT NULL,
        city VARCHAR(50) NOT NULL
      );
    `);

    // Create the 'cart' table
    await client.query(`
      CREATE TABLE cart(
        id_cart SERIAL PRIMARY KEY,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        date_de_mise_à_jour TIMESTAMP WITH TIME ZONE NOT NULL,
        id_user INTEGER NOT NULL UNIQUE,
        FOREIGN KEY(id_user) REFERENCES users(id_user)
      );
    `);

    // Create the 'table_order' table
    await client.query(`
      CREATE TABLE table_order(
        id_order SERIAL PRIMARY KEY,
        order_status VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
        order_total NUMERIC(15,2) NOT NULL,
        id_user INTEGER NOT NULL,
        FOREIGN KEY(id_user) REFERENCES users(id_user)
      );
    `);

    // Create the 'product' table
    await client.query(`
      CREATE TABLE product(
        id_product SERIAL PRIMARY KEY,
        product_name VARCHAR(50) NOT NULL UNIQUE,
        product_description TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
        product_price NUMERIC(10,2) NOT NULL,
        product_localisation VARCHAR(100) NOT NULL,
        image_product VARCHAR(255) NOT NULL
      );
    `);

    // Create the 'product_cart' table
    await client.query(`
      CREATE TABLE product_cart(
        id_cart INTEGER NOT NULL,
        id_product INTEGER NOT NULL,
        product_quantity INTEGER NOT NULL,
        PRIMARY KEY(id_cart, id_product),
        FOREIGN KEY(id_cart) REFERENCES cart(id_cart),
        FOREIGN KEY(id_product) REFERENCES product(id_product)
      );
    `);

    // Create the 'rating' table
    await client.query(`
      CREATE TABLE rating(
        id_user INTEGER NOT NULL,
        id_product INTEGER NOT NULL,
        rating_created_at TIMESTAMP WITH TIME ZONE NOT NULL,
        rating_note INTEGER NOT NULL,
        rating_comment TEXT NOT NULL,
        PRIMARY KEY(id_user, id_product),
        FOREIGN KEY(id_user) REFERENCES users(id_user),
        FOREIGN KEY(id_product) REFERENCES product(id_product)
      );
    `);

    // Create the 'bookmarks' table
    await client.query(`
      CREATE TABLE bookmarks(
        id_user INTEGER NOT NULL,
        id_product INTEGER NOT NULL,
        PRIMARY KEY(id_user, id_product),
        FOREIGN KEY(id_user) REFERENCES users(id_user),
        FOREIGN KEY(id_product) REFERENCES product(id_product)
      );
    `);

    // Create the 'contains' table
    await client.query(`
      CREATE TABLE contains(
        id_order INTEGER NOT NULL,
        id_product INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        PRIMARY KEY(id_order, id_product),
        FOREIGN KEY(id_order) REFERENCES table_order(id_order),
        FOREIGN KEY(id_product) REFERENCES product(id_product)
      );
    `);

    console.log('All tables created successfully');
  } catch (err) {
    console.error('Error resetting the database:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
};

resetDatabase();
