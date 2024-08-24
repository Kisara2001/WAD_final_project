const productModel = require("../../models/productModel");

// filter product
const filterProductController = async (req, res) => {
    try {
        const { category: categoryList = [] } = req.body;

        const product = await productModel.find({
            category: { $in: categoryList },
        });

        res.json({
            data: product,
            message: "product",
            error: false,
            success: true,
        });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = filterProductController;
