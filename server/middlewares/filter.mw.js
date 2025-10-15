

module.exports.filterProducts = async (req, res, next) => {
    try {
        const { minPrice, maxPrice, availability, category, sale } = req.query;
        req.filter = {};
        if (minPrice || maxPrice) {
            req.filter.price = {};
            if (minPrice) {
                req.filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                req.filter.price.$lte = Number(maxPrice);
            }
        }
        if (availability) {
            req.filter.stockQty = {};
            if (availability === 'true') {
                req.filter.stockQty.$gte = 1;
            } else {
                req.filter.stockQty.$eq = 0;
            }
        }
        if (category) {
            req.filter.category = category;
        }
        if (sale) {
            req.filter.isSale = sale === 'true';
        }
        next();
    } catch (error) {
        next(error);
    }
};