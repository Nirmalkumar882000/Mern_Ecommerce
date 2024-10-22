const express = require("express")
const router = express.Router()
const {
    createAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
} = require("../../controllers/shop/address-controller")


router.post("/add", createAddress);
router.get("/get/:userId", fetchAllAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;