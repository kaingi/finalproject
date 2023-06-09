const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 *1024;

const FileSizeLimiter = (req,res,next)=>{
    const files = req.body.product_file;
    const filesOverLimit = [];
    Object.keys(files).forEach(key =>{
        if(files[key].size > FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name)
        }
        
    })
    if(filesOverLimit.Length){
        const properVerb = filesOverLimit.length > 1 ? 'are' : 'is';
        const sentence = `upload failed. ${filesOverLimit.toString()}
        ${properVerb} over the file size limit of ${MB} MB. `.replaceAll(",",", ");

        const message = filesOverLimit.length <3 
            ? sentence.replace(","," and")
            :sentence.replace(/,(?=[^,]*$)/,"and");
        
        return res.status(413).json({status:"error",message});
    }

    next();
}

module.exports = FileSizeLimiter;