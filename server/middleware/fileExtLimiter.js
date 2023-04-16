const path = require("path")

const fileExtLimiter = (allowedExtArray) =>{
    return (req,res,next)=>{
        const files = req.body.product_file;
        const fileExtensions =[]
        Object.keys(files).forEach(key =>{
            fileExtensions.push(path.extname(files[key].name))
        })
        const allowed = fileExtensions.every(ext => allowedExtArray.include(ext))

        if (!allowed){
            const message = `upload failed. only ${allowedExtArray.toString()} files.allowed.`.replaceAll ("," ,", ")
            return res.status(422).json({status:"error", message})
        }
        next()
    }
}

module.exports = fileExtLimiter;