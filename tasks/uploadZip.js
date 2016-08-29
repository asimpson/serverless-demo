'use strict';
const aws = require('aws-sdk');
const fs = require('fs');
const s3 = new aws.S3();

fs.readFile('aws.zip', (err, data) => {
  const params = {Bucket: 'ams-admin', Body: data, Key: 'aws.zip'};
  s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  })
  .on('httpUploadProgress', evt => console.log('upload status: ', evt));
});
