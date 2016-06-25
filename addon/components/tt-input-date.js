/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-input-date';

/**
  This component is a container for a DateFieldComponent and a DatePickerComponent.

  @class InputDateComponent
  @namespace Date
*/
export default Ember.Component.extend({

  layout,

  /**
    @property showDatePicker
    @type {Boolean}
    @private
    @default false
  */
  showDatePicker: false,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['input-date']`
  */
  classNames: ['input-date'],

  /**
    @method _selectDate
    @param {Object} date should be a js `Date` object
    @private
  */
  _selectDate(date) {
    Ember.assert(`'date' should be a javascript 'Date()' object.`, Ember.typeOf(date) === 'date');
    this.set('value', date);
  },

  /**
    @method _openDatePicker
    @private
  */
  _openDatePicker() {
    this.set('showDatePicker', true);
  },

  /**
    @method _closeDatePicker
    @private
  */
  _closeDatePicker() {
    this.set('showDatePicker', false);
  },

  actions: {

    /**
      ACTION - Select date

      @method selectDate
      @param {Object} date
    */
    selectDate(date) {
      this._selectDate(date);
      this.send('closeDatePicker');
    },

    /**
      ACTION - toggle the `showDatePicker` property

      @method toggleDatePicker
    */
    toggleDatePicker() {
      this.toggleProperty('showDatePicker');
    },

    /**
      ACTION - Open the date-picker.  Set the `showDatePicker` property to true.

      @method openDatePicker
    */
    openDatePicker() {
      this._openDatePicker();
    },

    /**
      ACTION - Close the date-picker.  Set the `showDatePicker` property to false.

      @method closeDatePicker
    */
    closeDatePicker() {
      this._closeDatePicker();
    }
  }
});
