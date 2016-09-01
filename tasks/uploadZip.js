'use strict';
const aws = require('aws-sdk');
const fs = require('fs');
const s3 = new aws.S3();
const _ = require('lodash');
const options = require('command-line-args')([
  { name: 'bucket', alias: 'b', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'key', alias: 'k', type: String }
]);
const table = require('cli-table');

if (options.help || _.isEmpty(options)) {
  const helpTable = new table({
    head: ['Command', 'Explanation']
  });
  helpTable.push(
    ['-b', 'bucket name'],
    ['-k', 'key(file) name']
  );
  console.log(helpTable.toString());
} else {
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
}
