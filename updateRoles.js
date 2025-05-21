const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./Models/AdminSchema.js');
const User = require('./Models/UserSchema.js');

const MONGO_URL = process.env.ATLAS_DB_URL;

async function updateRoles() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('🔗 Connected to DB');

    const userResult = await User.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'user' } }
    );

    const adminResult = await Admin.updateMany(
      { role: { $exists: false } },
      { $set: { role: 'admin' } }
    );

    console.log(`✅ Updated users: ${userResult.modifiedCount}`);
    console.log(`✅ Updated admins: ${adminResult.modifiedCount}`);
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error updating roles:', err.message);
  }
}

updateRoles();
