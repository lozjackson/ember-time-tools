/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-calendar-weekrow-day';
import { computed, get } from '@ember/object';
import { typeOf } from '@ember/utils';

const { alias } = computed;

function compareDates(dateObject, { date, month, year }) {
  if (typeOf(dateObject) !== 'date') {
    dateObject = new Date(dateObject);
  }
  return dateObject.getDate() === date && dateObject.getMonth() === month && dateObject.getFullYear() === year;
}

/**
  @class CalendarWeekrowDayComponent
  @namespace Calendar
*/
export default Component.extend({
  layout,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['day-cell']`
  */
  classNames: ['day-cell'],

  /**
    @property classNameBindings
    @type {Array}
    @private
    @default `['today:calendar-today', 'weekend']`
  */
  classNameBindings: ['today:calendar-today', 'weekend'],

  /**
    This should be passed into the component.  It should be an Ember.Object with
    `date`, `month`, and `year` properties.

      Ember.Object.create({
        date: 31,
        month: 11,
        year: 2014
      });


    @property day
    @type {Object}
  */
  day: null,

  /**
    @property events
    @type {Array}
  */

  /**
    Alias of `day.date`.

    @property date
    @type {Number}
    @private
  */
  date: alias('day.date'),

  /**
    Alias of `day.month`.

    @property month
    @type {Number}
    @private
  */
  month: alias('day.month'),

  /**
    Alias of `day.year`.

    @property year
    @type {Number}
    @private
  */
  year: alias('day.year'),

  /**
    Computed property.  True if `day` is today.

    @property today
    @type {Boolean}
    @private
  */
  today: computed( 'clock.hour', 'date', 'month', 'year', function () {
    return compareDates(new Date(), this.getProperties('date', 'month', 'year'));
  }),

  /**
    Computed property.  True if `day` is a weekend.

    @property weekend
    @type {Boolean}
    @private
  */
  weekend: computed( 'date', 'month', 'year', function () {
    var date = new Date(this.get('year'), this.get('month'), this.get('date'));
    return (date.getDay() === 0 || date.getDay() === 6) ? true: false;
  }),

  _events: computed('events.@each.start', 'date', 'month', 'year', function () {
    let day = this.getProperties('date', 'month', 'year');
    const events = get(this, 'events');
    if (!events) {
      return [];
    }
    return this.get('events').filter(event => {
      return compareDates(event.get('start'), day);
    });
  })
});
