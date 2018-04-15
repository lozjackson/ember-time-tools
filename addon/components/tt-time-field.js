/**
  @module ember-time-tools
*/
import TextField from '@ember/component/text-field';

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
    this.sendAction('toggleTimePicker');
  },

  /**
    @event keyPress
    @private
  */
  keyPress() {
    return false;
  }
});
