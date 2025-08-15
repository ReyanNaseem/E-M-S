import { Employee } from "../models/employee.model.js";
import randomInteger from 'random-int';

const addEmployee = async(req, res)=>{
    try {
        const { name, role, salary, email, address, mobile } = req.body;

        if(!name || !role || !salary || !email || !address || !mobile){
            return res.status(401).json({
                message: 'Required field is missing'
            })
        }

        const employee = await Employee.create({
            ...req.body,
            user: req.user,
            empId: 'EMP'+randomInteger(101,999)+'ID'
        });

        return res.status(200).json({
            message: "Employee created successfully",
            data: employee
        })

        

    } catch (error) {
        return res.status(500).json({
            message: 'An error occur while create an employee',
            error: error.message
        })
    }
}

export {addEmployee}