const validate = (schema)=>async(req, res, next)=>{

    try {
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails =  err.errors[0].message;

        const error = {
            status, 
            message,
            extraDetails,
        };


        console.log(message);
        // res.status(400).json({msg:message});
        next(message);
    }

};

module.exports = validate;