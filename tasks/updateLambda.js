'use strict';
const aws = require('aws-sdk');
const lambda = new aws.Lambda({region: 'us-east-1'});
const table = require('cli-table');
const _ = require('lodash');

const options = require('command-line-args')([
  { name: 'bucket', alias: 'b', type: String },
  { name: 'key', alias: 'k', type: String },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'name', alias: 'n', type: String }
]);

if (options.help || _.isEmpty(options)) {
  const helpTable = new table({
    head: ['Command', 'Explanation']
  });
  helpTable.push(
    ['-b', 'bucket name'],
    ['-k', 'key(file) name'],
    ['-n', 'function name to update']
  );
  console.log(helpTable.toString());
} else {
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
}
