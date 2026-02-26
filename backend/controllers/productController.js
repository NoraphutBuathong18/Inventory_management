const Product = require('../models/Product');

// GET /api/products?search=&category=&sort=&order=&page=&limit=
const getAllProducts = async (req, res) => {
    try {
        const {
            search = '',
            category = '',
            sort = 'created_at',
            order = 'DESC',
            page = 1,
            limit = 10,
        } = req.query;

        const allowedSort = ['name', 'category', 'quantity', 'price', 'created_at'];
        const sortCol = allowedSort.includes(sort) ? sort : 'created_at';
        const sortOrder = order.toUpperCase() === 'ASC' ? 1 : -1;

        const offset = (parseInt(page) - 1) * parseInt(limit);
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { sku: { $regex: search, $options: 'i' } }
            ];
        }

        if (category) {
            query.category = category;
        }

        // Count total
        const total = await Product.countDocuments(query);

        // Fetch paginated data
        const data = await Product.find(query)
            .sort({ [sortCol]: sortOrder })
            .skip(offset)
            .limit(parseInt(limit));

        // Fetch distinct categories for filter
        const categories = await Product.distinct('category');

        res.status(200).json({
            data,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
            categories,
        });
    } catch (error) {
        console.error('getAllProducts error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        console.error('getProductById error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, category, description, quantity, price, sku, status } = req.body;

        if (!name || !category || quantity === undefined || price === undefined) {
            return res.status(400).json({ message: 'Name, category, quantity, and price are required.' });
        }

        const newProduct = await Product.create({
            name, category, description, quantity, price, sku, status
        });

        res.status(201).json({ message: 'Product created successfully.', data: newProduct });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'SKU already exists.' });
        }
        console.error('createProduct error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, description, quantity, price, sku, status } = req.body;

        const updated = await Product.findByIdAndUpdate(
            id,
            { name, category, description, quantity, price, sku, status },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product updated successfully.', data: updated });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'SKU already exists.' });
        }
        console.error('updateProduct error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('deleteProduct error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// GET /api/products/stats
const getStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const lowStockCount = await Product.countDocuments({ quantity: { $lt: 10 } });
        const categories = await Product.distinct('category');

        const valueAggregation = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ["$quantity", "$price"] } }
                }
            }
        ]);

        const totalValue = valueAggregation.length > 0 ? valueAggregation[0].totalValue : 0;

        res.status(200).json({
            totalProducts,
            totalValue: parseFloat(totalValue),
            lowStockCount,
            totalCategories: categories.length,
        });
    } catch (error) {
        console.error('getStats error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getStats,
};
