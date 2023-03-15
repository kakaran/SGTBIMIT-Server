const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images"), function (error, success) {
            if (error) throw error
        });
    }, filename: function (req, file, cb) {
        const name = Date.now() + '-' + path.extname(file.originalname);
        cb(null, name, function (error, success) {
            if (error) throw error
        })
    }
})

const maxSize = 1 * 1024 * 1024; // for 1MB

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: { fileSize: maxSize }
});


module.exports =upload;