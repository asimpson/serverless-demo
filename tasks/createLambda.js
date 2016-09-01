'use strict';
const aws = require('aws-sdk');
const lambda = new aws.Lambda({region: 'us-east-1'});
const table = require('cli-table');
const _ = require('lodash');
const options = require('command-line-args')([
  { name: 'bucket', alias: 'b', type: String },
  { name: 'key', alias: 'k', type: String },
  { name: 'name', alias: 'n', type: String },
  { name: 'handler', alias: 'a', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'role', alias: 'r', type: String },
  { name: 'publish', alias: 'p', type: Boolean }
]);

if (options.help || _.isEmpty(options)){
  const helpTable = new table({
    head: ['Command', 'Explanation']
  });
  helpTable.push(
    ['-b', 'bucket name'],
    ['-k', 'key(file) name'],
    ['-n', 'function name to update'],
    ['-a', 'needs to end in .handler, name of function'],
    ['-r', 'e.g. arn:aws:iam::235125689288:role/ams-s3-lambda'],
    ['-p', 'publish?']
  );
  console.log(helpTable.toString());
} else {
  var params = {
    Code: {
      S3Bucket: options.bucket || 'ams-admin',
      S3Key: options.key
    },
    FunctionName: options.name,
    Handler: options.handler,
    Role: options.role || 'arn:aws:iam::235125689288:role/ams-s3-lambda',
    Runtime: 'nodejs4.3',
    Publish: options.publish || false,
  };

  lambda.createFunction(params, function(err, data) {
    if (err) console.log('not created: ', err, err.stack); // an error occurred
    else     console.log('created: ', data);           // successful response
  });
}
