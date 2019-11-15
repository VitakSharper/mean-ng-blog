const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    MIME_TYPE_MAP[file.mimetype] ? cb(null, 'backend/images') : cb(new Error(`Invalid mime type ${file.mimetype}`), 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});
