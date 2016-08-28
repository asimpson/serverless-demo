import React, { Component} from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'

const amsRenderString = (event, context, callback) => {
  class Root extends Component {
    render() {
      return (
        <p>🤐 zipped all the things!</p>
      );
    }
  }

  const a = renderToString(<Root />);
  callback(null, a);
};

exports.handler = amsRenderString;
