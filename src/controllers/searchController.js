const db = require('../database/models');

module.exports = async (req, res) => {
    const { keywords } = req.query;
    
    try {
        const products = await db.Product.findAll({
            where: {
                name: {
                    [db.Sequelize.Op.like]: `%${keywords}%`
                }
            }
        });
        
        res.render('products', { products });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching products');
    }
};
