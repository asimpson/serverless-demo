import React, { Component} from 'react'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'

class Root extends Component {
  render() {
    return (
      <p>🚀 {this.props.body}</p>
    );
  }
}


const amsRenderString = (event, context, callback) => {
  console.log('event', event.body);
  const a = renderToString(<Root body={event.body}/>);
  callback(null, a);
};

exports.handler = amsRenderString;
