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
  timeIsSelected: Ember.computed('timeSelected', 'model.hours', 'model.mins', function() {
    let hours = this.get('model.hours'),
      mins = this.get('model.mins'),
      selectedTime = new Date(this.get('timeSelected'));
    return (selectedTime.getHours() === hours && selectedTime.getMinutes() === mins) ? true : false;
  }),

  /**
    @property displayText
    @type {String}
    @private
  */
  displayText: Ember.computed( 'model.hours', 'model.mins', 'militaryTime', function () {
    let hours = this.get('model.hours'),
      mins = this.get('model.mins'),
      militaryTime = this.get('militaryTime'),
      string = '',
      meridian = '';

    if (isNaN(hours)) {
      return string;
    }

    if (!militaryTime) {
      meridian = (hours < 12) ? ' am':' pm';

      if (hours === 0) {
        hours = 12;
      } else if (hours > 12) {
        hours -= 12;
      }
    }

    if (hours < 10) {
      hours = `0${hours}`; //'0' + hours;
    }

    if (!mins || mins < 0 || mins > 59) {
      mins = 0;
    }

    if (mins < 10) {
      mins = `0${mins}`; //'0' + mins;
    }
    return `${hours}:${mins}${meridian}`;// hours + ':' + mins + meridian;
  }),

  /**
    @method click
    @private
  */
  click() {
    this.sendAction('select', this.get('model'));
  }
});
