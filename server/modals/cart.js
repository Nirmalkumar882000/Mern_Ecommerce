const moongoose = require("mongoose")



const cartSchema = new moongoose.Schema({
    userId: {
        type: moongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    items: [
        {
            productId: {
                type: moongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        },
    ]

},
    {
        timestamps: true
    }
)


const Cart = moongoose.model("Cart", cartSchema)

module.exports = Cart