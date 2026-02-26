const db = require('../config/db');

// GET /api/products?search=&category=&sort=&order=&page=&limit=
const getAllProducts = async (req, res) => {
    try {
        const {
            search = '',
            category = '',
            sort = 'id',
            order = 'ASC',
            page = 1,
            limit = 10,
        } = req.query;

        const allowedSort = ['id', 'name', 'category', 'quantity', 'price', 'created_at'];
        const allowedOrder = ['ASC', 'DESC'];
        const sortCol = allowedSort.includes(sort) ? sort : 'id';
        const sortOrder = allowedOrder.includes(order.toUpperCase()) ? order.toUpperCase() : 'ASC';

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const params = [];
        let whereClause = 'WHERE 1=1';

        if (search) {
            whereClause += ' AND (name LIKE ? OR description LIKE ? OR sku LIKE ?)';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (category) {
            whereClause += ' AND category = ?';
            params.push(category);
        }

        // Count total
        const [countResult] = await db.query(
            `SELECT COUNT(*) AS total FROM products ${whereClause}`,
            params
        );
        const total = countResult[0].total;

        // Fetch paginated data
        const [rows] = await db.query(
            `SELECT * FROM products ${whereClause} ORDER BY ${sortCol} ${sortOrder} LIMIT ? OFFSET ?`,
            [...params, parseInt(limit), offset]
        );

        // Fetch distinct categories for filter
        const [categories] = await db.query(
            'SELECT DISTINCT category FROM products ORDER BY category ASC'
        );

        res.status(200).json({
            data: rows,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit)),
            },
            categories: categories.map((c) => c.category),
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
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.status(200).json({ data: rows[0] });
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

        const [result] = await db.query(
            `INSERT INTO products (name, category, description, quantity, price, sku, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, category, description || '', quantity, price, sku || null, status || 'active']
        );

        const [newProduct] = await db.query('SELECT * FROM products WHERE id = ?', [result.insertId]);

        res.status(201).json({ message: 'Product created successfully.', data: newProduct[0] });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
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

        // Check exists
        const [existing] = await db.query('SELECT id FROM products WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        await db.query(
            `UPDATE products SET name=?, category=?, description=?, quantity=?, price=?, sku=?, status=?
       WHERE id=?`,
            [name, category, description || '', quantity, price, sku || null, status || 'active', id]
        );

        const [updated] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product updated successfully.', data: updated[0] });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
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
        const [existing] = await db.query('SELECT id FROM products WHERE id = ?', [id]);

        if (existing.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        await db.query('DELETE FROM products WHERE id = ?', [id]);
        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('deleteProduct error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// GET /api/products/stats
const getStats = async (req, res) => {
    try {
        const [[totalProducts]] = await db.query('SELECT COUNT(*) AS total FROM products');
        const [[totalValue]] = await db.query(
            'SELECT COALESCE(SUM(quantity * price), 0) AS total_value FROM products'
        );
        const [[lowStock]] = await db.query(
            'SELECT COUNT(*) AS low FROM products WHERE quantity < 10'
        );
        const [categoryCount] = await db.query(
            'SELECT COUNT(DISTINCT category) AS total FROM products'
        );

        res.status(200).json({
            totalProducts: totalProducts.total,
            totalValue: parseFloat(totalValue.total_value),
            lowStockCount: lowStock.low,
            totalCategories: categoryCount[0].total,
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
