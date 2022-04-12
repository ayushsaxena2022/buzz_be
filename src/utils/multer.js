const res = require("express/lib/response");
const multer = require("multer");
const path = require('path')

//declare the storage engine
const storage = multer.diskStorage({});
// file validate for jpeg and png
const validateFile = (req, file, callback) => {
    let fileExt = path.extname(file.originalname)
    if (fileExt === '.jpeg' || fileExt === '.png' || fileExt === '.jpg') {
        callback(null, true)
    }
    else {
        callback(new Error('File Format Not supported'), false)
        return;
    }
}
const uploadFile = multer({
    storage: storage,
    fileFilter: validateFile
})

module.exports = uploadFile
