const addEmployee = async(req, res)=>{
    try {
        const { name, role, salary, email, address, mobile } = req.body;

        // if(!name || !role || !salary || !email || !address || !mobile){
        //     return res.status(401).json({
        //         message: 'Required field is missing'
        //     })
        // }

        

    } catch (error) {
        return resizeBy.status(500).json({
            message: 'An error occur while create an employee',
            error: error.message
        })
    }
}