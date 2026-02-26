/**
 * Reset admin password to 'admin123'
 * Run: node scripts/resetAdmin.js
 */
const bcrypt = require('bcryptjs');
const db = require('../config/db');
require('dotenv').config();

async function resetAdmin() {
    try {
        const hash = await bcrypt.hash('admin123', 10);
        const [result] = await db.query(
            "UPDATE users SET password_hash = ? WHERE username = 'admin'",
            [hash]
        );
        if (result.affectedRows > 0) {
            console.log('✅ Admin password reset to: admin123');
        } else {
            console.log('⚠️  Admin user not found. Inserting...');
            await db.query(
                "INSERT INTO users (username, email, password_hash, role) VALUES ('admin', 'admin@inventory.com', ?, 'admin')",
                [hash]
            );
            console.log('✅ Admin user created with password: admin123');
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Error:', err.message);
        process.exit(1);
    }
}

resetAdmin();
