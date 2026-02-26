const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const updateAdminPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas');

        const newHash = "$2a$10$bCnrR3wDU85sRQrMdPrL.OwytcKNxS1K3ftavonDYvfCRKuHjKpX.";

        const result = await User.updateOne(
            { username: 'admin' },
            { $set: { password_hash: newHash } }
        );

        if (result.matchedCount > 0) {
            console.log('✅ Admin user password hash successfully updated!');
        } else {
            console.log('❌ Admin user not found.');
        }

        process.exit(0);
    } catch (err) {
        console.error('❌ Error updating admin:', err);
        process.exit(1);
    }
}

updateAdminPassword();
