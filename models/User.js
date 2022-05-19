const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 4,
            max: 20,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
            max: 50,
          },
        email: {
            type: String,
            unique: true,
        },
        key: {
            type:String,
            unique:true,
        },
    },
    { timestamps: true },
    {collection:'user'}
);

module.exports = mongoose.model("user",UserSchema);