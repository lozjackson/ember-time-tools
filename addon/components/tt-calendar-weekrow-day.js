/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-calendar-weekrow-day';

var computed = Ember.computed;
var alias = computed.alias;

/**
  @class CalendarWeekrowDayComponent
  @namespace Calendar
*/
export default Ember.Component.extend({
  layout,

  /**
    @property classNames
    @type {Array}
    @default `[ 'day-cell' ]`
  */
  classNames: [ 'day-cell' ],

  /**
    @property classNameBindings
    @type {Array}
    @default `[ 'today:calendar-today', 'weekend' ]`
  */
  classNameBindings: [ 'today:calendar-today', 'weekend' ],

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
    Alias of `day.date`.

    @property date
    @type {Number}
  */
  date: alias('day.date'),

  /**
    Alias of `day.month`.

    @property month
    @type {Number}
  */
  month: alias('day.month'),

  /**
    Alias of `day.year`.

    @property year
    @type {Number}
  */
  year: alias('day.year'),

  /**
    Computed property.  True if `day` is today.

    @property today
    @type {Boolean}
  */
  today: computed( 'clock.hour', 'date', 'month', 'year', function () {
    var today = new Date();
    var { date, month, year } = this.getProperties([ 'date', 'month', 'year' ]);
    return ( today.getDate() === date && today.getMonth() === month && today.getFullYear() === year ) ? true : false;
  }),

  /**
    Computed property.  True if `day` is a weekend.

    @property weekend
    @type {Boolean}
  */
  weekend: computed( 'date', 'month', 'year', function () {
    var date = new Date(this.get('year'), this.get('month'), this.get('date'));
    return (date.getDay() === 0 || date.getDay() === 6) ? true: false;
  })
});
