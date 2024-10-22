const Order = require("../../modals/order")


// get all orders

const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find({})

        if (!order.length) {
            return res.status(400).json({
                success: false,
                message: "No order found"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// getOrderDetails for Admin

const getOrderDetails = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id)
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Order not found"
            })
        }
        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// updateOrderStatis for admin  

const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params
        const { orderStatus } = req.body

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found!",
            });
        }

        const updateOrder = await Order.findByIdAndUpdate(id, {
            orderStatus
        })

        res.status(200).json({
            success: true,
            message: "Order status is updated successfully!",
            data: updateOrder
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    getAllOrders,
    getOrderDetails,
    updateOrderStatus
}




