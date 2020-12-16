const multer = require('multer');
const storage = multer.diskStorage
(
    {
        destination:(req, file, callback) => 
        {
            callback(null, './public/images');
        },
        filename:(req, file, callback) =>
        {
            callback(null, `${file.originalname}`);
        }
    }
)

const fileFilter = (req, file, callback) =>
{
    const filesFormat = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];
    const isAccepeted = filesFormat.find(filesFormat => filesFormat === file.mimetype);

    if(isAccepeted)
    {
        return callback(null, true);
    }else
    {
        return callback(null, false);
    }
}

module.exports = multer
(
    {
        storage, fileFilter
    }

)