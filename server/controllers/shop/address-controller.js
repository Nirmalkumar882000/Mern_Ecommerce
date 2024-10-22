const Address = require("../../modals/address")


// create address 

const createAddress = async (req, res) => {
    const { userId, address, city, pincode, phone, notes } = req.body

    if (!userId || !address || !city || !pincode || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const newAddress = new Address({
            userId,
            address,
            city,
            pincode,
            phone,
            notes
        })
        await newAddress.save()
        res.status(200).json({
            success: true,
            message: "Address created successfully",
            data: newAddress
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


// fetch all Addess 

const fetchAllAddress = async (req, res) => {
    const { userId } = req.params
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!",
            });
        }
        const address = await Address.find({ userId })
        res.status(200).json({
            success: true,
            message: "Address fetched successfully",
            data: address
        })

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}


// edit address

const editAddress = async (req, res) => {
    const { userId, addessId } = req.params;
    const formData = req.body
    try {
        if (!userId || !addessId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const updateAddress = await Address.findByIdAndUpdate(
            {
                _id: addressId,
                userId
            },
            formData,
            { new: true }
        )


        if (updateAddress) {
            return res.statue(400).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: updateAddress
        })

    } catch (error) {
        console.log(error)
        res.statue(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }

}


// delete products

const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;
    try {
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const deleteAddress = await Address.findByIdAndDelete({
            _id: addressId,
            userId
        })


        if (!deleteAddress) {
            return res.status(400).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: deleteAddress
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
    createAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}