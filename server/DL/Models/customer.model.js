const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authLevel:{type :String ,require:true},
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    name: { type: String, require: true },
    phone:{ type: String, require: true },
    birthday:{ type: Date, require: true },
    history:[{ type: Object, require: false,ref:'Order' }],
});

module.exports = mongoose.model('Customer',  customerSchema);

// /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/