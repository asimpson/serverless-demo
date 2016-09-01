'use strict';
const aws = require('aws-sdk');
const lambda = new aws.Lambda({region: 'us-east-1'});

const options = require('command-line-args')([
  { name: 'bucket', alias: 'b', type: String },
  { name: 'key', alias: 'k', type: String },
  { name: 'name', alias: 'n', type: String }
]);

var params = {
  FunctionName: options.name || 'ams-react',
  Publish: true,
  S3Bucket: options.bucket || 'ams-admin',
  S3Key: options.key || 'renderIndexHTML.zip'
};
lambda.updateFunctionCode(params, function(err, data) {
  if (err) console.log('err', err, err.stack); // an error occurred
  else     console.log('ya', data);           // successful response
});
