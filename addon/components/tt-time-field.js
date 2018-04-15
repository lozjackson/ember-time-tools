/**
  @module ember-time-tools
*/
import TextField from '@ember/component/text-field';
import { get } from '@ember/object';

/**
  A read-only text field component for displaying a time

  @class TimeFieldComponent
  @namespace Time
*/
export default TextField.extend({

  /**
    @property tagName
    @type {String}
    @private
    @default input
  */
  tagName: 'input',

  /**
    @property classNames
    @type {Array}
    @private
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
    @private
  */
  click(e) {
    e.target.blur();
    const toggleTimePicker = get(this, 'toggleTimePicker');
    if (typeof toggleTimePicker === 'function') {
      toggleTimePicker();
    }
  },

  /**
    @event keyPress
    @private
  */
  keyPress() {
    return false;
  }
});
