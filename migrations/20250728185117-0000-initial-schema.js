export async function up(queryInterface, Sequelize) {
  // Table users
  await queryInterface.createTable('users', {
    id_user: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    user_role: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    street: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    zip_code: {
      type: Sequelize.STRING(10),
      allowNull: false
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  // Table cart
  await queryInterface.createTable('cart', {
    id_cart: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    }
  });

  // Table table_order
  await queryInterface.createTable('table_order', {
    id_order: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_status: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    order_total: {
      type: Sequelize.NUMERIC(15, 2),
      allowNull: false
    },
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    }
  });

  // Table product
  await queryInterface.createTable('product', {
    id_product: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_name: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true
    },
    product_description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    product_price: {
      type: Sequelize.NUMERIC(10, 2),
      allowNull: false
    },
    product_localisation: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    image_product: {
      type: Sequelize.STRING(255),
      allowNull: false
    }
  });

  // Table product_cart
  await queryInterface.createTable('product_cart', {
    id_cart: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cart',
        key: 'id_cart'
      }
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id_product'
      }
    },
    product_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  // Table rating
  await queryInterface.createTable('rating', {
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id_product'
      }
    },
    rating_created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    rating_note: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rating_comment: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });

  // Table bookmarks
  await queryInterface.createTable('bookmarks', {
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id_product'
      }
    }
  });

  // Table contains
  await queryInterface.createTable('contains', {
    id_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'table_order',
        key: 'id_order'
      }
    },
    id_product: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'id_product'
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.NUMERIC(10, 2),
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('contains');
  await queryInterface.dropTable('bookmarks');
  await queryInterface.dropTable('rating');
  await queryInterface.dropTable('product_cart');
  await queryInterface.dropTable('table_order');
  await queryInterface.dropTable('cart');
  await queryInterface.dropTable('product');
  await queryInterface.dropTable('users');
}
