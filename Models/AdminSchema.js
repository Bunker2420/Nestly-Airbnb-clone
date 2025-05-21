const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const { type, min } = require('../utils/Joilistingvalidation');

const AdminSchema = new Schema({
    role: {
        type: String,
        default: 'admin'
    }
})

AdminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model('Admin',AdminSchema)

module.exports = Admin;