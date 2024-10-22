const Product = require("../../modals/product")


const searchQuery = async (req, res) => {
    const { keyword } = req.params;
    try {
        if (!keyword || typeof keyword !== "string") {
            return res.status(400).json({
                succes: false,
                message: "Keyword is required and must be in string format",
            });
        }

        const regEx = new RegExp(keyword, "i");

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ],
        };

        const searchResults = await Product.find(createSearchQuery);

        res.status(200).json({
            success: true,
            data: searchResults,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


module.exports = {
    searchQuery
}