/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-input-time';

/**
  This component is a container for a TimeFieldComponent and a TimePickerComponent.

  @class InputTimeComponent
  @namespace Components
*/
export default Ember.Component.extend({

  layout: layout,

  /**
    @property showTimePicker
    @type {Boolean}
    @default false
  */
  showTimePicker: false,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['input-time']`
  */
  classNames: ['input-time'],

  /**
    time should be an object with `hours` and `mins` properties

    `{ hours: 15, mins: 30 }` // 15:30

    @method _selectTime
    @param {Object} time
    @private
  */
  _selectTime(time) {
    let date = new Date(0);
    date.setHours(time.hours);
    date.setMinutes(time.mins);
    this.set('value', date);
  },

  /**
    @method _openTimePicker
    @private
  */
  _openTimePicker() {
    this.set('showTimePicker', true);
  },

  /**
    @method _closeTimePicker
    @private
  */
  _closeTimePicker() {
    this.set('showTimePicker', false);
  },

  actions: {

    /**
      ACTION - Select time

      time should be an object with `hours` and `mins` properties

      `{ hours: 15, mins: 30 }` // 15:30

      @method selectTime
      @param {Object} time
    */
    selectTime(time) {
      this._selectTime(time);
      this._closeTimePicker();
    },

    /**
      ACTION - toggle the `showTimePicker` property

      @method toggleTimePicker
    */
    toggleTimePicker() {
      this.toggleProperty('showTimePicker');
    },

    /**
      ACTION - Open the time-picker.  Set the `showTimePicker` property to true.

      @method openTimePicker
    */
    openTimePicker() {
      this._openTimePicker();
    },

    /**
      ACTION - Close the time-picker.  Set the `showTimePicker` property to false.

      @method closeTimePicker
    */
    closeTimePicker() {
      this._closeTimePicker();
    }
  }
});
