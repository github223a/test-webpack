import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
    this.timerID = null;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
        <span>{this.state.date.toLocaleTimeString()}</span>
        <p>lalal</p>
      </div>
    );
  }
}
