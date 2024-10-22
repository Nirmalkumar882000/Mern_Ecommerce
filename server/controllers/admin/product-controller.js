const { imageUploadUtil } = require("../../helpers/cloudinary")
const Product = require("../../modals/product")

const handleImage = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64")
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

// add Product  controller

const addProduct = async (req, res) => {
    const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
    } = req.body;

    try {
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
            averageReview,
        })

        await newlyCreatedProduct.save()

        res.status(200).json({
            success: true,
            message: "Product added successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}


// fetch All products

const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data: products
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



// edit products


const editProducts = async (req, res) => {
    try {
        const { id } = req.params
        const { image, title, description, category, brand, price, salePrice, totalStock, averageReview } = req.body;

        let checkProduct = await Product.findById(id)

        if (!checkProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        checkProduct.image = image || checkProduct.image
        checkProduct.title = title || checkProduct.title
        checkProduct.description = description || checkProduct.description
        checkProduct.category = category || checkProduct.category
        checkProduct.brand = brand || checkProduct.brand
        checkProduct.price = price || checkProduct.price
        checkProduct.salePrice = salePrice || checkProduct.salePrice
        checkProduct.totalStock = totalStock || checkProduct.totalStock
        checkProduct.averageReview = averageReview || checkProduct.averageReview

        await checkProduct.save()

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            checkProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// delete product
const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            deleteProduct
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    handleImage,
    addProduct,
    fetchAllProducts,
    editProducts,
    deleteProducts
}


