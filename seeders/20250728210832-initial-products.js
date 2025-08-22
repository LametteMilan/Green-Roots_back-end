export async function up(queryInterface, Sequelize) {
  const products = [
    {
      product_name: 'Baobab',
      product_localisation: 'Afrique subsaharienne',
      product_description: "Connu comme \"l'arbre de vie\", il stocke l’eau dans son tronc massif et fournit des fruits riches en vitamine C, feuilles nutritives et écorce médicinale.",
      product_price: 18.00,
      image_product: 'baobab.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Chêne pédonculé',
      product_localisation: 'France',
      product_description: "Arbre robuste et à croissance lente, essentiel à la biodiversité forestière. Il abrite de nombreuses espèces d'insectes, oiseaux et champignons.",
      product_price: 20.00,
      image_product: 'chene_pedoncule.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Acajou',
      product_localisation: 'Amazonie',
      product_description: "Arbre tropical précieux, menacé par l’exploitation illégale. Il joue un rôle clé dans la stabilisation des sols tropicaux.",
      product_price: 41.50,
      image_product: 'acajou.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Teck',
      product_localisation: 'Indonésie',
      product_description: "Très prisé pour son bois résistant. Sa plantation durable peut compenser les pertes de forêts naturelles.",
      product_price: 11.00,
      image_product: 'teck.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Manguier',
      product_localisation: 'Inde',
      product_description: "En plus de ses fruits nutritifs, le manguier est un excellent arbre pour l’ombre et l’amélioration des sols.",
      product_price: 99.99,
      image_product: 'manguier.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Pin sylvestre',
      product_localisation: 'Russie',
      product_description: "Résistant au froid, il est essentiel pour reboiser les zones boréales et joue un rôle majeur dans le captage du carbone.",
      product_price: 5.00,
      image_product: 'pin_sylvestre.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Albizia',
      product_localisation: 'Afrique',
      product_description: "Arbre à croissance rapide, souvent utilisé en agroforesterie. Il améliore la fertilité des sols grâce à sa capacité à fixer l’azote. Moins exigeant en eau que l’eucalyptus, il offre de l’ombre, du fourrage pour le bétail, et aide à lutter contre l’érosion.",
      product_price: 89.50,
      image_product: 'albizia.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Noyer d’Amérique',
      product_localisation: 'Amérique du Nord',
      product_description: "Arbre à bois noble, il contribue à la biodiversité des forêts tempérées. Ses noix nourrissent de nombreuses espèces.",
      product_price: 9.99,
      image_product: 'noyer_amerique.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Arbre à pain',
      product_localisation: 'Caraïbes',
      product_description: "Arbre nourricier dont les fruits riches en amidon sont une source alimentaire importante dans les régions tropicales.",
      product_price: 20.00,
      image_product: 'arbre_a_pain.webp',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      product_name: 'Moringa',
      product_localisation: 'Inde',
      product_description: "Arbre miracle pour ses feuilles très nutritives, ses graines purificatrices d’eau, et sa croissance rapide.",
      product_price: 4.50,
      image_product: 'moringa.webp',
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  return queryInterface.bulkInsert('product', products);
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('product', null, {});
}
