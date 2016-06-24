/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-time-slot';

const { computed } = Ember;

/**
  @class TimeSlotComponent
  @namespace Components
*/
export default Ember.Component.extend({

  layout,

  /**
    @property tagName
    @type {String}
    @private
    @default `li`
  */
  tagName: 'li',

  /**
    @property classNameBindings
    @type {Array}
    @private
    @default `['timeIsSelected:time-selected']`
  */
  classNameBindings: ['timeIsSelected:time-selected'],

  /**
    24-hour clock

    @property militaryTime
    @type {Boolean}
    @private
    @default false
  */
  militaryTime: false,

  /**
    @property timeIsSelected
    @type {Boolean}
    @private
  */
  timeIsSelected: Ember.computed('timeSelected', 'model.hour', 'model.minute', function() {
    let hour = this.get('model.hour'),
      minute = this.get('model.minute'),
      selectedTime = this.get('timeSelected');

    if (Ember.typeOf(selectedTime) === 'null') { return false; }

    selectedTime = new Date(selectedTime);
      Ember.Logger.debug('message', selectedTime, this.get('timeSelected'));
    return (selectedTime.getHours() === hour && selectedTime.getMinutes() === minute) ? true : false;
  }),

  /**
    @property displayText
    @type {String}
    @private
  */
  displayText: Ember.computed( 'model.hour', 'model.minute', 'militaryTime', function () {
    let hour = this.get('model.hour'),
      minute = this.get('model.minute'),
      militaryTime = this.get('militaryTime'),
      string = '',
      meridian = '';

    if (isNaN(hour)) {
      return string;
    }

    if (!militaryTime) {
      meridian = (hour < 12) ? ' am':' pm';

      if (hour === 0) {
        hour = 12;
      } else if (hour > 12) {
        hour -= 12;
      }
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (!minute || minute < 0 || minute > 59) {
      minute = 0;
    }

    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${hour}:${minute}${meridian}`;
  }),

  /**
    @method click
    @private
  */
  click() {
    this.sendAction('select', this.get('model'));
  }
});
