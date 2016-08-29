'use strict';
const aws = require('aws-sdk');
const lambda = new aws.Lambda({region: 'us-east-1'});

var params = {
  FunctionName: 'ams-react',
  Publish: true,
  S3Bucket: 'ams-admin',
  S3Key: 'aws.zip'
};
lambda.updateFunctionCode(params, function(err, data) {
  if (err) console.log('err', err, err.stack); // an error occurred
  else     console.log('ya', data);           // successful response
});
