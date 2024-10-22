const {
    addFeatures,
    getFeatureImage
} = require("../../controllers/common/feature-controllers")
const express = require("express")
const router = express.Router()


router.post("/add", addFeatures)
router.get("/get", getFeatureImage)


module.exports = router



