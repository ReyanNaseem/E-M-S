import {Schema, model} from 'mongoose';

const employeeschema = new Schema(
    {   
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        empId:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        role:{
            type: String,
            enums: ['HR','Sales','Web Developer','CEO','Manager','Trainee','Project Manager'],
            required: true
        },
        salary:{
            type: Number,
            required: true
        },
        image:{
            type: String,
        },
        mobile:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export const Employee = model('Employee', employeeschema);