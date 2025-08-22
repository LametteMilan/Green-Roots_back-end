import express from 'express';
import { ROLES } from '../constants/roles.js';
import { userController } from '../controllers/user.controller.js';
import { productController } from '../controllers/product.controller.js';
import { productCartController } from '../controllers/productCart.controller.js';
import { cartController } from '../controllers/cart.controller.js';
import { bookmarkController } from '../controllers/bookmark.controller.js';
import { ratingController } from '../controllers/rating.controller.js';
import { orderController } from '../controllers/order.controller.js';
import { sessionController } from '../controllers/session.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multerUpload.js';

const router = express.Router();

/************************* Routes d'authentification ************************/

router.post('/sessions', sessionController.create);
router.delete('/sessions', authMiddleware, sessionController.destroy);
router.get('/sessions/verify', authMiddleware, sessionController.verify);

/************************* Routes publiques************************/

router.get('/users', authMiddleware, roleMiddleware(ROLES.ADMIN), userController.getAllUsers);
router.get('/users/:id_user', authMiddleware, userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/users/:id_user', authMiddleware, userController.updateUser);
router.delete('/users/:id_user', authMiddleware, roleMiddleware(ROLES.ADMIN), userController.deleteUser);

/************************* Routes Admin************************/

router.get('/products', productController.getAllProducts);
router.get('/products/:id_product', productController.getOneProduct);
router.post('/products', authMiddleware, roleMiddleware(ROLES.ADMIN), upload.single('image'), productController.createProduct);
router.put('/products/:id_product', authMiddleware, roleMiddleware(ROLES.ADMIN), upload.single('image_product'),productController.updateProduct);
router.delete('/products/:id_product', authMiddleware, roleMiddleware(ROLES.ADMIN), productController.deleteProduct);

// Routes pour gérer le lien entre produits et panier (qté & produits)
router.get('/product-carts', authMiddleware, productCartController.getAllProductCarts);
router.get('/product-carts/:id_cart/:id_product',authMiddleware, productCartController.getOneProductCart);
router.post('/product-carts',authMiddleware, productCartController.createProductCart);
router.put('/product-carts/:id_cart/:id_product',authMiddleware, productCartController.updateProductCart);
router.delete('/product-carts/:id_cart/:id_product',authMiddleware, productCartController.deleteProductCart);
router.get('/product-carts/:id_cart',authMiddleware, productCartController.getCartProducts);

//Routes pour la gestion du panier en lui même
// router.get('/carts', authMiddleware, roleMiddleware(ROLES.ADMIN), cartController.getAllCarts);
router.get('/carts', authMiddleware, cartController.getOneCart);
// router.post('/carts', authMiddleware, cartController.createCart);
router.put('/carts/:id_cart', authMiddleware, cartController.updateCart);
router.delete('/carts/:id_cart', authMiddleware, cartController.deleteCart);
// router.post('/carts/:id_cart/products', authMiddleware, cartController.addProductToCart);
// router.delete('/carts/:id_cart/products/:id_product', authMiddleware, cartController.removeProductFromCart);
// router.put('/carts/:id_cart/products/:id_product', authMiddleware, cartController.updateProductInCart);
router.get('/carts/:id_cart/products', authMiddleware, cartController.getCartProducts);


router.get('/bookmarks', authMiddleware, roleMiddleware(ROLES.ADMIN), bookmarkController.getAllBookmarks);
router.post('/bookmarks',authMiddleware, bookmarkController.createBookmark);
router.put('/bookmarks/:id_user',authMiddleware, bookmarkController.updateBookmark);
router.delete('/bookmarks/:id_user',authMiddleware, bookmarkController.deleteBookmark);
router.post('/bookmarks/:id_user/products/:id_product',authMiddleware, bookmarkController.addProductToBookmark);
router.delete('/bookmarks/:id_user/products/:id_product',authMiddleware, bookmarkController.removeProductFromBookmark);
router.get('/bookmarks/:id_user/products',authMiddleware, bookmarkController.getBookmarkProducts);


router.get('/ratings', ratingController.getAllRatings);
router.get('/ratings/:id_user/:id_product', ratingController.getOneRating);
router.post('/ratings', authMiddleware, ratingController.createRating);
router.put('/ratings/:id_user/:id_product', authMiddleware, roleMiddleware(ROLES.ADMIN), ratingController.updateRating);
router.delete('/ratings/:id_user/:id_product', authMiddleware, roleMiddleware(ROLES.ADMIN), ratingController.deleteRating);
router.get('/products/:id_product/ratings', ratingController.getProductRatings);
router.get('/users/:id_user/ratings', authMiddleware, ratingController.getUserRatings);


router.get('/orders', authMiddleware, roleMiddleware(ROLES.ADMIN), orderController.getAllOrders);
router.get('/orders/:id_order', authMiddleware, orderController.getOneOrder);
router.post('/orders', authMiddleware, orderController.createOrder);
router.put('/orders/:id_order', authMiddleware, orderController.updateOrder);
router.delete('/orders/:id_order', authMiddleware, orderController.deleteOrder);
router.get('/users/:id_user/orders', authMiddleware, orderController.getUserOrders);

export { router };
