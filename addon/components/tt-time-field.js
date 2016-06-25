/**
  @module ember-time-tools
*/
import Ember from 'ember';

/**
  A read-only text field component for displaying a time

  @class TimeFieldComponent
  @namespace Time
*/
export default Ember.TextField.extend({

  /**
    @property tagName
    @type {String}
    @default input
  */
  tagName: 'input',

  /**
    @property classNames
    @type {Array}
    @default ['no-select', 'tt-time-field']
  */
  classNames: ['no-select', 'tt-time-field'],

  /**
    @property size
    @type {Number}
    @default 8
  */
  size: 8,

  /**
    @event click
  */
  click(e) {
    e.target.blur();
    this.sendAction('toggleTimePicker');
  },

  /**
    @event keyPress
  */
  keyPress() {
    return false;
  }
});
