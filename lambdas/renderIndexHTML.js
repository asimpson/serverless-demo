const aws = require('aws-sdk');
import React from 'react';
import { renderToString } from 'react-dom/server';
import Root from '../components/Root.js';
const s3 = new aws.S3();

const amsRenderIndex = (event, context, callback) => {
  const a = renderToString(<Root body={event.body}/>);
  const html = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <title>Serverless</title>
        </head>
        <body>${a}</body>
    </html>
  `;
  const htmlBuffer = new Buffer(html, 'utf8');
  const params = {
    ContentType: 'text/html',
    ACL: 'public-read',
    Bucket: 'ams-admin',
    Body: htmlBuffer,
    Key: 'index.html'
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('upload err', err);
    }
    callback(null, data);
  });
};

exports.handler = amsRenderIndex;
