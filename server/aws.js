const AWS = require('aws-sdk');
const fs = require('fs');

const s3Client = new AWS.S3({
  accessKeyId: 'AKIAXNK5EX77CJUB4ZPD',
  secretAccessKey: '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',
  region: 'us-west-1',
});

const uploadParams = {
  Bucket: 'wineandwagsphotos',
  Key: '', // pass key
  Body: null, // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;

// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = 'AKIAXNK5EX77AL5KOXOD', 'kAZ/XFL9ldP9TZY+kOjy8/gAcsibTBpiJF3SQcTW'

// AWS.config.update({
//   accessKeyId: 'AKIAXNK5EX77AL5KOXOD',
//   secretAccessKey: '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',
//   region: 'us-west-1',
// });

// const s3Bucket = new AWS.S3({ params: { Bucket: 'wineandwagsphotos' } });

// const imageUpload = (path, buffer) => {
//   const data = {
//     Key: path,
//     Body: buffer,
//     ContentEncoding: 'contentEncoding',
//     ContentType: 'contentType',
//     ACL: 'acl',
//   };
//   return new Promise((res, rej) => {
//     s3Bucket.putObject(data, (err) => {
//       if (err) {
//         rej(err);
//       } else {
//         res(s3Url + path);
//       }
//     });
//   });
// };

// const getImageUrl = async (type, base64Image) => {
//   const buffer = getImgBuffer(base64Image);
//   const currentTime = new Date().getTime();
//   return imageUpload(`${type}/${currentTime}.jpeg`, buffer);
// };
