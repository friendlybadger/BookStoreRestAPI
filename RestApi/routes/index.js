const express = require("express");
const controllers = require("../controllers");
const controllersAuthors = require("../controllers/Authors.js");
const controllersPublisher = require("../controllers/Publisher.js");
const controllersBooks = require("../controllers/Books.js");
const controllersCustomers = require("../controllers/Customers.js");
const controllersOrders = require("../controllers/Orders.js");
const controllersOrderItem = require("../controllers/OrderItem.js");
const router = express.Router();

// router.route("/").get();
// router.route("/").get(controllers.getAllUsers);
// router.route("/").post(controllers.createUser);
// router.route("/:id")
// router.route("/:id").get(controllers.getUser)
// router.route("/:id").put(controllers.updateUser)
// router.route("/:id").delete(controllers.deleteUser);


router.route("/Authors").get(controllersAuthors.getAllAuthors);
router.route("/Authors").post(controllersAuthors.createAuthors);
router.route("/Authors/:id").get(controllersAuthors.getAuthors)
router.route("/Authors/:id").put(controllersAuthors.updateAuthors)
router.route("/Authors/:id").delete(controllersAuthors.deleteAuthors);

router.route("/Publisher").get(controllersPublisher.getAllPublisher);
router.route("/Publisher").post(controllersPublisher.createPublisher);
router.route("/Publisher/:id").get(controllersPublisher.getPublisher)
router.route("/Publisher/:id").put(controllersPublisher.updatePublisher)
router.route("/Publisher/:id").delete(controllersPublisher.deletePublisher);

router.route("/Books").get(controllersBooks.getAllBooks);
router.route("/Books").post(controllersBooks.createBooks);
router.route("/Books/:id").get(controllersBooks.getBooks)
router.route("/Books/:id").put(controllersBooks.updateBooks)
router.route("/Books/:id").delete(controllersBooks.deleteBooks);

router.route("/Customers").get(controllersCustomers.getAllCustomers);
router.route("/Customers").post(controllersCustomers.createCustomers);
router.route("/Customers/:id").get(controllersCustomers.getCustomers)
router.route("/Customers/:id").put(controllersCustomers.updateCustomers)
router.route("/Customers/:id").delete(controllersCustomers.deleteCustomers);

router.route("/Orders").get(controllersOrders.getAllOrders);
router.route("/Orders").post(controllersOrders.createOrders);
router.route("/Orders/:id").get(controllersOrders.getOrders)
router.route("/Orders/:id").put(controllersOrders.updateOrders)
router.route("/Orders/:id").delete(controllersOrders.deleteOrders);

router.route("/OrderItem").get(controllersOrderItem.getAllOrderItem);
router.route("/OrderItem").post(controllersOrderItem.createOrderItem);
router.route("/OrderItem/:id").get(controllersOrderItem.getOrderItem)
router.route("/OrderItem/:id").put(controllersOrderItem.updateOrderItem)
router.route("/OrderItem/:id").delete(controllersOrderItem.deleteOrderItem);


module.exports = router;