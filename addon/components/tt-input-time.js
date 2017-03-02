/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-input-time';
import format from 'ember-time-tools/utils/format';
import DestinationElementMixin from 'ember-ui-components/mixins/destination-element';

/**
  This component is a container for a TimeFieldComponent and a TimePickerComponent.

  @class InputTimeComponent
  @namespace Time
*/
export default Ember.Component.extend(DestinationElementMixin, {

  layout: layout,

  /**
    @property value
    @type {Object} A javascript `Date()` object.
  */

  /**
    Format can be:

    * date (the default)
    * timestamp
    * object

    @property format
    @type {String}
  */

  /**
    @property placeholder
    @type {String}
  */

  /**
    @property to
    @type {String}
  */

  /**
    @property destinationElementId
    @type {String}
    @private
  */

  /**
    @property displayFormat
    @type {String}
    @default `h:mm a`
  */
  displayFormat: 'h:mm a',

  /**
    @property pickerDisplayFormat
    @type {String}
    @default `hh:mm a`
  */
  pickerDisplayFormat: 'hh:mm a',

  /**
    @property timeInterval
    @type {Number}
    @default `30`
  */
  timeInterval: 30,

  /**
    ## Scroll to selected time

    With this property set to `true` the time picker will scroll to display the
    selected time. If that is not the desired behaviour then you can set
    `scrollToSelectedTime` to `false`.

    ```
    {{input-time scrollToSelectedTime=false}}
    ```

    @property scrollToSelectedTime
    @type {Boolean}
    @default `true`
  */
  scrollToSelectedTime: true,

  /**
    @property resetDate
    @type {Boolean}
    @default `true`
  */
  resetDate: true,

  /**
    @property showTimePicker
    @type {Boolean}
    @private
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
    @method _selectTime
    @param {Object} date A javascript `Date` object
    @private
  */
  _selectTime(date) {
    this.set('value', format(date, this.get('format')));
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

      @method selectTime
      @param {Object} time A javascript `Date` object
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
