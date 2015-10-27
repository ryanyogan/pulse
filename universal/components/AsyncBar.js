import React, { PropTypes, Component } from 'react';

export default class AsyncBar extends Component {
  static propTypes = {
    isWorking: PropTypes.bool,
    error: PropTypes.string
  };

  render() {
    const spinner = (this.props.isWorking) ? this.renderSpinner() : null;
    const error = (this.props.error) ? this.renderError() : null;

    return (
      <section className='Pulse-async'>
        {spinner}
        {error}
      </section>
    );
  }

  renderSpinner() {
    return (
      <div className='Pulse-async-spinner'>
        Loading...
      </div>
    );
  }

  renderError() {
    return (
      <p className='Pulse-async-error'>
        {this.props.error}
      </a>
    );
  }
}
