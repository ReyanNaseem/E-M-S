import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function(){
    this.password = bcrypt.hashSync(this.password, 10);
})

export const User = model('User', userSchema);