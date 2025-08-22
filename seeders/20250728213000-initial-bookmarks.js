export async function up(queryInterface, Sequelize) {
    // 1. Récupérer les ids utilisateurs
    const users = await queryInterface.sequelize.query(
      `SELECT id_user FROM users WHERE email IN ('admin@green-roots.com', 'user@green-roots.com');`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
  
    // 2. Récupérer les ids de produit (ex : les 4 premiers produits)
    const products = await queryInterface.sequelize.query(
      `SELECT id_product FROM product ORDER BY id_product ASC LIMIT 4;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
  
    // 3. Générer les associations user<->produit
    const bookmarks = [];
    users.forEach((user) => {
      products.forEach((product) => {
        bookmarks.push({
          id_user: user.id_user,
          id_product: product.id_product,
        });
      });
    });
  
    return queryInterface.bulkInsert("bookmarks", bookmarks);
  }
  
  export async function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("bookmarks", null, {});
  }
  