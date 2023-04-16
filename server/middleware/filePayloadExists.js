const filesPayloadExists = (req,res,next)=>{
    if (!req.body.product_file) return res.status(400).json ({status:"error",message:"missing files"})
    next()
}

module.exports = filesPayloadExists;