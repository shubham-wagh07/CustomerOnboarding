const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: { type: String, required: true },
    email : {type:String, required: true, unique: true},
    password: {type:String, required: true},
    created_At: {type:Number, default: Date.now().valueOf()},
    updated_At: { type: Number, default: Date.now().valueOf() }
})

module.exports = mongoose.model("User", UserSchema);