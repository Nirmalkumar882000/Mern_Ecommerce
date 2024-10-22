const express = require("express")
const router = express.Router()
const {
    addCart,
    fetchCart,
    deleteCartItem,
    updateCart
} = require("../../controllers/shop/cart-controller")



router.post("/add", addCart);
router.get("/get/:userId", fetchCart);
router.put("/update-cart", updateCart);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;