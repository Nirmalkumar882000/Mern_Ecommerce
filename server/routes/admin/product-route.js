const express = require("express")
const router = express.Router()
const {
    handleImage,
    addProduct,
    deleteProducts,
    fetchAllProducts,
    editProducts
} = require("../../controllers/admin/product-controller")


router.post("/image", handleImage)
router.post("/add_product", addProduct)
router.get("/fetch_products", fetchAllProducts)
router.put("/edit_product/:id", editProducts)
router.delete("/delete_product/:id", deleteProducts)

module.exports = router