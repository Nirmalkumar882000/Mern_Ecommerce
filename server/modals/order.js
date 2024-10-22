const moongoose = require("mongoose")

const orderSchema = new moongoose.Schema({
    userId: String,
    cartId: String,
    cartItem: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number,
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
})

const Order = moongoose.model("Order", orderSchema)

module.exports = Order