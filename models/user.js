const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    username: {
        type: 'string',
        required: true
    },
    role:{
        type: 'string',
        enum: ['employee', 'admin'],
        default: 'employee',
        required: true,
    },
    assignedReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    reviewsFromOthers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
},{
    timestamps: true,
});

// compare the hash password
userSchema.methods.comparePassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password)
    }catch(err){
        throw err;
    }
}


// Hash the password before saving the user
userSchema.pre('save' ,async function(next) {
    try{
        if(!this.isModified('password')){
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch(err){
        return next(err);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;