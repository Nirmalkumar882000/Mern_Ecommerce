const Features = require("../../modals/features")

const addFeatures = async (req, res) => {
    try {
        const { image } = req.body;

        const featureImages = new Features({
            image
        })

        await featureImages.save()

        res.status(200).json({
            
            success: true,
            message: "Feature added successfully",
            data: featureImages
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}


const getFeatureImage = async (req, res) => {
    try {
        const getFeatureImage = await Features.find({})
        res.status(200).json({
            success: true,
            data: getFeatureImage
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
    addFeatures,
    getFeatureImage
}