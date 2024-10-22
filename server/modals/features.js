const moongoose = require("mongoose")


const featuresSchema = new moongoose.Schema({
    image: String,
},
    {
        timestamps: true
    }
)


const Features = moongoose.model("Features", featuresSchema)

module.exports = Features