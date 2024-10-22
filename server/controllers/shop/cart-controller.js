const Cart = require("../../modals/cart")
const Product = require("../../modals/product")



// addCart

const addCart = async (req, res) => {
    const { userId, productId, quantity } = req.body
    try {
        if (!userId || !productId || !quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }


        const product = await Product.findOne(productId)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }


        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )


        if (findCurrentProductIndex !== -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



// fetchCart 

const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
            })
        }


        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice"
        })

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart items not found"
            })
        }

        const validateItem = cart.items.filter(
            (productItem) => productItem.productId
        )

        if (validateItem.length < cart.items.length) {
            cart.items = validateItem
            await cart.save()
        }

        const populateCartItem = validateItem.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }))


        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: {
                ...cart._doc,
                items: populateCartItem
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }

}




const updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body
    try {
        if (!userId || !productId || !quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(400).json({
                success: false,
                message: "Cart not found"
            })
        }

        const findCurrentProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        )


        if (findCurrentProductIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Cart items is not found"
            })
        }

        cart.items[findCurrentProductIndex].quantity = quantity
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}



const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        cart.items = cart.items.filter(
            (item) => item.productId._id.toString() !== productId
        );

        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice",
        });

        const populateCartItems = cart.items.map((item) => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};



module.exports = {
    addCart,
    fetchCart,
    updateCart,
    deleteCartItem
}