'use strict';
const aws = require('aws-sdk');
const fs = require('fs');
const s3 = new aws.S3();
const options = require('command-line-args')([
  { name: 'bucket', alias: 'b', type: String },
  { name: 'key', alias: 'k', type: String }
]);
const key = options.key || 'renderIndexHTML.zip';
const bucket = options.bucket || 'ams-admin';

fs.readFile(key, (err, data) => {
  const params = {Bucket: bucket, Body: data, Key: key};
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  })
  .on('httpUploadProgress', evt => console.log('upload status: ', evt));
});
