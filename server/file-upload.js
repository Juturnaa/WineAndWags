const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: 'AKIAXNK5EX77CJUB4ZPD',
  secretAccessKey: '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',
  region: 'us-west-1',
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'wineandwagsphotos',
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: 'TESTING_META_DATA' });
    },
    key(req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
