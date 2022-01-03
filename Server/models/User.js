const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

/*
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);

        console.log(this.email, this.password);

        console.log('Called before saving a user');
    } catch (error) {
        next(error);
    }
});
*/
/*
UserSchema.post('save', async function(next){
    try {
        console.log('Called after saving a user');
    } catch (error) {
        next(error);
    }
});
*/

module.exports = mongoose.model('users', UserSchema);
