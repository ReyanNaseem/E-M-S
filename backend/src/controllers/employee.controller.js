import { Employee } from "../models/employee.model.js";
import randomInteger from 'random-int';

const addEmployee = async(req, res)=>{
    try {
        const { name, role, salary, email, address, mobile, image } = req.body;

        if(!name || !role || !salary || !email || !address || !mobile || !image){
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

const getAllEmployee = async(req, res)=>{
    try {
        const employees = await Employee.find();

        if(!employees){
            return res.status(400).json({
                message: 'Employee not found'
            })
        }

        return res.status(200).json({
            message: 'success',
            data: employees
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while get all employees',
            error: error.message
        })

    }
}

const deleteEmployee = async(req, res)=>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);

        if(!employee){
            return res.status(404).json({
                message: 'Employee not found'
            })
        }

        return res.status(200).json({
            message: 'Employee deleted success',
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while deleting employees',
            error: error.message
        })

    }
}

const updateEmployee = async(req, res)=>{
    try {

        const {id} = req.params
        const employee = await Employee.findByIdAndUpdate(id,req.body,{new: true})

        if(!employee){
            return res.status(404).json({
                message: 'Employee not found'
            })
        }

        return res.status(200).json({
            message: 'Employee updated success',
        })

    } catch (error) {
        
        return res.status(500).json({
            message: 'An error occur while updating employees',
            error: error.message
        })

    }
}

const getEmployee = async(req, res)=>{
    try {

        const {id} = req.params;
        const employee = await Employee.findById(id);

        if(!employee){
            return res.status(404).json({
                message: 'Employee does not exist'
            })
        }

        return res.status(200).json({
            employee
        })
        
    } catch (error) {

        return res.status(500).json({
            message: 'An error occur while updating employees',
            error: error.message
        })
        
    }
}

export {
    addEmployee,
    getAllEmployee,
    deleteEmployee,
    updateEmployee,
    getEmployee
}