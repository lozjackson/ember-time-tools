/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-event-container';

/**
  @class EventContainerComponent
  @namespace Calendar
*/
export default Ember.Component.extend({
  layout: layout,

  /**
    @property classNames
    @type {Array}
    @default `[ 'event-container' ]`
  */
  classNames: [ 'event-container' ],

  /**
    @event click
  */
  click() {
    this.select( null );
  }
});
