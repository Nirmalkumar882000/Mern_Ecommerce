const express = require("express")
const router = express.Router()
const {
    getAllOrders,
    getOrderDetails,
    updateOrderStatus
} = require("../../controllers/admin/order-controllers")



router.get("/get", getAllOrders);
router.get("/details/:id", getOrderDetails);
router.put("/update/:id", updateOrderStatus);

module.exports = router;