/**
  @module ember-time-tools
*/
import Ember from 'ember';

/**
  A text field component for displaying dates

  @class DateFieldComponent
  @extends Arms.TextFieldComponent
  @namespace DateTime
*/
export default Ember.TextField.extend({

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
      @default ['no-select', 'tt-date-field']
    */
    classNames: ['no-select', 'tt-date-field'],

    /**
      @property size
      @type {Number}
      @private
      @default 14
    */
    size: 14,

    /**
      @event click
      @private
    */
    click(e) {
      e.target.blur();
      this.sendAction('toggleDatePicker');
    },

    /**
      @event keyPress
      @private
    */
    keyPress() {
      return false;
    }
});
