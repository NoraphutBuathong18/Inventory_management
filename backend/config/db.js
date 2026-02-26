const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Options like useNewUrlParser and useUnifiedTopology are no longer 
            // strictly necessary in Mongoose 6+, but keeping connection clean.
        });
        console.log(`✅ Connected to MongoDB Atlas: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
