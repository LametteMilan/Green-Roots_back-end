import pg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
const { Client } = pg;

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createBookmarksTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS bookmarks (
      id_user INT REFERENCES users(id_user) ON DELETE CASCADE,
      id_product INT REFERENCES product(id_product) ON DELETE CASCADE,
      PRIMARY KEY (id_user, id_product)
    );
  `;
  await client.query(query);
  console.log('Bookmarks table created');
};

const products = [
  {
    product_name: 'Baobab',
    product_localisation: 'Afrique subsaharienne',
    product_description: 'Connu comme "l\'arbre de vie", il stocke l’eau dans son tronc massif et fournit des fruits riches en vitamine C, feuilles nutritives et écorce médicinale.',
    product_price: 18.00,
    image_product: 'baobab.webp',
  },
  {
    product_name: 'Chêne pédonculé',
    product_localisation: 'France',
    product_description: 'Arbre robuste et à croissance lente, essentiel à la biodiversité forestière. Il abrite de nombreuses espèces d\'insectes, oiseaux et champignons.',
    product_price: 20.00,
    image_product: 'chene_pedoncule.webp',
  },
  {
    product_name: 'Acajou',
    product_localisation: 'Amazonie',
    product_description: 'Arbre tropical précieux, menacé par l’exploitation illégale. Il joue un rôle clé dans la stabilisation des sols tropicaux.',
    product_price: 41.50,
    image_product: 'acajou.webp',
  },
  {
    product_name: 'Teck',
    product_localisation: 'Indonésie',
    product_description: 'Très prisé pour son bois résistant. Sa plantation durable peut compenser les pertes de forêts naturelles.',
    product_price: 11.00,
    image_product: 'teck.webp',
  },
  {
    product_name: 'Manguier',
    product_localisation: 'Inde',
    product_description: 'En plus de ses fruits nutritifs, le manguier est un excellent arbre pour l’ombre et l’amélioration des sols.',
    product_price: 99.99,
    image_product: 'manguier.webp',
  },
  {
    product_name: 'Pin sylvestre',
    product_localisation: 'Russie',
    product_description: 'Résistant au froid, il est essentiel pour reboiser les zones boréales et joue un rôle majeur dans le captage du carbone.',
    product_price: 5.00,
    image_product: 'pin_sylvestre.webp',
  },
  {
    product_name: 'Albizia',
    product_localisation: 'Afrique',
    product_description: 'Arbre à croissance rapide, souvent utilisé en agroforesterie. Il améliore la fertilité des sols grâce à sa capacité à fixer l’azote. Moins exigeant en eau que l’eucalyptus, il offre de l’ombre, du fourrage pour le bétail, et aide à lutter contre l’érosion.',
    product_price: 89.50,
    image_product: 'albizia.webp',
  },
  {
    product_name: 'Noyer d’Amérique',
    product_localisation: 'Amérique du Nord',
    product_description: 'Arbre à bois noble, il contribue à la biodiversité des forêts tempérées. Ses noix nourrissent de nombreuses espèces.',
    product_price: 9.99,
    image_product: 'noyer_amerique.webp',
  },
  {
    product_name: 'Arbre à pain',
    product_localisation: 'Caraïbes',
    product_description: 'Arbre nourricier dont les fruits riches en amidon sont une source alimentaire importante dans les régions tropicales.',
    product_price: 20.00,
    image_product: 'arbre_a_pain.webp',
  },
  {
    product_name: 'Moringa',
    product_localisation: 'Inde',
    product_description: 'Arbre miracle pour ses feuilles très nutritives, ses graines purificatrices d’eau, et sa croissance rapide.',
    product_price: 4.50,
    image_product: 'moringa.webp',
  },
];

// Liste des utilisateurs
const users = [
  {
    email: 'admin@green-roots.com',
    password: 'admin123',
    first_name: 'Vincent',
    last_name: 'Rousselet',
    user_role: 'admin',
    street: '4 rue à gauche',
    zip_code: 14000,
    country: 'Citoyen du monde',
    city: 'a gauche',
  },
  {
    email: 'user@green-roots.com',
    password: 'password123',
    first_name: 'Milan',
    last_name: 'Milette',
    user_role: 'customer',
    street: '2 rue du boulevard',
    zip_code: 67890,
    country: 'Oui',
    city: 'Non',
  },
];

// Fonction pour insérer les données
const seedData = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');

    // Créer la table bookmarks
    await createBookmarksTable();

    // Insertion des produits
    for (const product of products) {
      const query = `
        INSERT INTO product (product_name, product_localisation, product_description, product_price, image_product, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        ON CONFLICT (product_name) DO NOTHING;
      `;
      const values = [
        product.product_name,
        product.product_localisation,
        product.product_description,
        product.product_price,
        product.image_product,
      ];

      await client.query(query, values);
      console.log(`Inserted product: ${product.product_name}`);
    }

    // Insertion des utilisateurs
    for (const user of users) {

      const hashedPassword = await bcrypt.hash(user.password, 10);  // Hash du mot de passe

      const query = `
        INSERT INTO users (email, password, first_name, last_name, user_role, created_at, updated_at, street, zip_code, country, city)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7, $8, $9)
        ON CONFLICT (email) DO NOTHING RETURNING id_user;
      `;
      const values = [
        user.email,
        hashedPassword, // Utilisation du mot de passe hashé
        user.first_name,
        user.last_name,
        user.user_role,
        user.street,
        user.zip_code,
        user.country,
        user.city,
      ];

      const res = await client.query(query, values);
      const userId = res.rows[0].id_user;
      console.log(`Inserted user: ${user.email}`);

      // Ajouter des bookmarks pour chaque utilisateur
      const productIds = [1, 2, 3, 4]; // IDs des produits à ajouter comme favoris pour l'utilisateur
      for (const productId of productIds) {
        const bookmarkQuery = `
          INSERT INTO bookmarks (id_user, id_product)
          VALUES ($1, $2)
          ON CONFLICT (id_user, id_product) DO NOTHING;
        `;
        const bookmarkValues = [userId, productId];

        await client.query(bookmarkQuery, bookmarkValues);
        console.log(`Inserted bookmark for user ${userId} and product ${productId}`);
      }
    }

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    await client.end();
    console.log('Disconnected from the database');
  }
};

seedData();
