import bcrypt from "bcrypt";

export async function up(queryInterface, Sequelize) {
  const passwordAdmin = await bcrypt.hash("admin123", 10);
  const passwordUser = await bcrypt.hash("password123", 10);

  const users = [
    {
      email: "admin@green-roots.com",
      password: passwordAdmin, // Utilisation du mot de passe hashé
      first_name: "Vincent",
      last_name: "Rousselet",
      user_role: "admin",
      street: "4 rue à gauche",
      zip_code: "14000",
      country: "Citoyen du monde",
      city: "a gauche",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      email: "user@green-roots.com",
      password: passwordUser,
      first_name: "Milan",
      last_name: "Milette",
      user_role: "customer",
      street: "2 rue du boulevard",
      zip_code: "67890",
      country: "Oui",
      city: "Non",
      created_at: new Date(),
      updated_at: new Date(),
    }
  ];

  return queryInterface.bulkInsert("users", users);
}

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete("users", {
    email: ["admin@green-roots.com", "user@green-roots.com"]
  });
}
