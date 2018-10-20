import '@babel/polyfill';
import React from 'react';

class App extends React.Component {
  state = { message: 'false' };

  render() {
    const { message } = this.state;
    return <div>{message}</div>;
  }
}

export default App;
