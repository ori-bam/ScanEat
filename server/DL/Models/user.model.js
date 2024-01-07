const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //authLevel:{type :String ,require:true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    name: { type: String, require: true },
    phone:{ type: String, require: true },
    birthday:{ type: Date, require: true },
    history:[{ type: Object, require: false,ref:'Order' }],
});
module.exports = mongoose.model('User',  userSchema);