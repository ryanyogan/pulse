import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import Header from '../components/Header';
import EventList from '../components/EventList';
import EventTicker from '../components/EventTicker';
import AsyncBar from '../components/AsyncBar';
import EventInput from '../components/EventInput';

import * as PulseActions from '../actions/PulseActions';

export default class PulseApp extends Component {
  static propTypes = {
    addEvent: PropTypes.func.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    userId: PropTypes.string,
    events: PropTypes.array,
    isWorking: PropTypes.bool,
    error: PropTypes.any
  };

  render() {
    const actions = {
      editEvent: this.props.editEvent,
      deleteEvent: this.props.deleteEvent
    };

    return (
      <div className='Pulse-Container'>
        <Header />
        <section className='Pulse-addEventForm'>
          <EventInput onSubmit={this.props.addEvent}
                      userId={this.props.userId}
                      textLabel='What happened?'
                      valueLabel='Rating' />
        </section>
        <AsyncBar isWorking={this.props.isWorking} error={this.props.error} />
        <EventList events={this.props.events} userId={this.props.userId} actions={actions} />
        <EventTicket events={this.props.events} userId={this.props.userId} length={3} />
      </div>
    );
  }
}
