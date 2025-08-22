// Import des modules nécessaires : PostgreSQL natif et variables d’environnement
import pg from 'pg';
import dotenv from 'dotenv';
const { Client } = pg;

// Chargement des variables d’environnement depuis le fichier .env
dotenv.config();

// Connexion à la base de données via les variables .env
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Fonction principale pour créer les tables
const createTables = async () => {
  try {
    // Connexion à la base
    await client.connect();
    console.log('Connected to the database');

    // Liste des tables à supprimer si elles existent déjà
    const tablesToDrop = [
      'contains',
      'bookmarks',
      'rating',
      'product_cart',
      'table_order',
      'cart',
      'product',
      'users'
    ];

    // Suppression des tables dans l’ordre (avec CASCADE en cas de dépendances)
    console.log('Dropping existing tables...');
    for (const tableName of tablesToDrop) {
      try {
        await client.query(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
        console.log(`Dropped table ${tableName} (if existed)`);
      } catch (err) {
        console.error(`Error dropping table ${tableName}:`, err.message);
      }
    }
    console.log('All existing tables dropped');

    // Définition des requêtes de création de tables
    const tables = [
      {
        name: 'users',
        query: `
          CREATE TABLE users(
            id_user SERIAL PRIMARY KEY,
            password VARCHAR(50) NOT NULL,
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
        `,
      },
      {
        name: 'cart',
        query: `
          CREATE TABLE cart(
            id_cart SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
            id_user INTEGER NOT NULL UNIQUE,
            FOREIGN KEY(id_user) REFERENCES users(id_user)
          );
        `,
      },
      {
        name: 'table_order',
        query: `
          CREATE TABLE table_order(
            id_order SERIAL PRIMARY KEY,
            order_status VARCHAR(50) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
            order_total NUMERIC(15,2) NOT NULL,
            id_user INTEGER NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id_user)
          );
        `,
      },
      {
        name: 'product',
        query: `
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
        `,
      },
      {
        name: 'product_cart',
        query: `
          CREATE TABLE product_cart(
            id_cart INTEGER NOT NULL,
            id_product INTEGER NOT NULL,
            product_quantity INTEGER NOT NULL,
            PRIMARY KEY(id_cart, id_product),
            FOREIGN KEY(id_cart) REFERENCES cart(id_cart),
            FOREIGN KEY(id_product) REFERENCES product(id_product)
          );
        `,
      },
      {
        name: 'rating',
        query: `
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
        `,
      },
      {
        name: 'bookmarks',
        query: `
          CREATE TABLE bookmarks(
            id_user INTEGER NOT NULL,
            id_product INTEGER NOT NULL,
            PRIMARY KEY(id_user, id_product),
            FOREIGN KEY(id_user) REFERENCES users(id_user),
            FOREIGN KEY(id_product) REFERENCES product(id_product)
          );
        `,
      },
      {
        name: 'contains',
        query: `
          CREATE TABLE contains(
            id_order INTEGER NOT NULL,
            id_product INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            PRIMARY KEY(id_order, id_product),
            FOREIGN KEY(id_order) REFERENCES table_order(id_order),
            FOREIGN KEY(id_product) REFERENCES product(id_product)
          );
        `,
      },
    ];

    // Exécution de chaque requête de création dans l'ordre
    for (const table of tables) {
      await client.query(table.query);
      console.log(`Table ${table.name} created successfully`);
    }

  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    // Fermeture propre de la connexion à la base
    await client.end();
    console.log('Disconnected from the database');
  }
};

// Lancement de la fonction
createTables();
