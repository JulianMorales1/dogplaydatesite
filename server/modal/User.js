const mongoose = require ("mongoose");
const userSchema = new mongoose.Schema(
    {
        email: {
            type:String,
            unique:true
        },
        password: String
    }
);

userSchema.virtual('dogs',{
    ref:'Dog',
    localField:'_id',
    foreignField:'user',
    justOne:false
})

module.exports = mongoose.model('User', userSchema);

