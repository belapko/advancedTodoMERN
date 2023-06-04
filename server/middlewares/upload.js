const multer = require('multer');
const fs = require("fs");

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    }
    cb(null, false);
};

storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueFileName = req.body.phone;
        fs.unlink('uploads/' + uniqueFileName, (err) => {});
        cb(null, uniqueFileName);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

exports.uploadMiddleware = upload.single('photo');