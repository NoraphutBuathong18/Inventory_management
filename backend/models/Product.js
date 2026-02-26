const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    sku: {
        type: String,
        unique: true,
        sparse: true, // Allows nulls to be ignored in unique index
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'archived'],
        default: 'active',
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Product', productSchema);
