/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import layout from '../templates/components/tt-calendar-month';
import DateObject from 'ember-time-tools/utils/date';
import getDaysInMonth from 'ember-time-tools/utils/get-days-in-month';
import { A } from '@ember/array';
import { typeOf } from '@ember/utils';

const { alias, sort } = computed;

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const sortProperties = ['start:asc', 'end:asc'];

const Day = EmberObject.extend({
  date: null,
  month: null,
  year: null,
  inMonth: false
});

/**
  @class CalendarMonthComponent
  @namespace Calendar
*/
export default Component.extend({
  layout,

  /**
    You can supply a custom component to use for the events displayed in the calendar.

    @property eventComponent
    @type {String}
  */

  /**
    @property classNames
    @type {Array}
    @default `['tt-calendar-month', 'tt-calendar-container']`
    @private
  */
  classNames: ['tt-calendar-month', 'tt-calendar-container'],

  /**
    These are the names for each day (column) displayed in the header.

    @property dayNames
    @type {Array}
    @default `['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']`
  */
  dayNames,

  /**
    @property monthNames
    @type {Array}
    @default `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`
  */
  monthNames,

  /**
    An array of event models.  Each event should have at least `start`, `end`
    and `description` properties.

      ```
      var event = {
        description: 'Event Title'
        start: timestamp,
        end: timestamp
      }
      ```

    The timestamp can be an integer (milliseconds since 1/1/1970) or a Date object.

    @property events
    @type {Array}
  */
  events: null,

  /**
    @property sortProperties
    @type {Array}
    @default `['start:asc', 'end:asc']`
    @private
  */
  sortProperties,

  /**
    Sorts the `events` array.

    @property sortedEvents
    @type {Array}
    @private
  */
  sortedEvents: sort('events', 'sortProperties'),

  /**
    The selected model/event.

    @property selected
    @type {Object}
  */
  selected: null,

  /**
    A `Date()` object representing the currently selected date.

    Alias of `viewDate.date`.

    @property selectedDate
    @type {Object}
  */
  selectedDate: alias('viewDate.date'),

  /**
    @property viewDate
    @type {Object}
    @private
  */
  viewDate: null,

  /**
    Alias of `viewDate.year`.

    @property year
    @type {Number}
    @readonly
    @private
  */
  year: alias('viewDate.year'),

  /**
    Alias of `viewDate.month`.

    @property month
    @type {Number}
    @readonly
    @private
  */
  month: alias('viewDate.month'),

  /**
    @method init
    @private
  */
  init() {
    this.set('viewDate', DateObject.create());
    this.setToday();
    return this._super(...arguments);
  },

  /**
    The month name string.. ie. 'January'.

    @property monthName
    @type {String}
    @private
  */
  monthName: computed('month', 'monthNames', function () {
    let { month, monthNames } = this.getProperties('month', 'monthNames');
    return monthNames[month];
  }),

  /**
    The number of the day ofthe week that the calendar will start on.
    Day numbers start at 0 = monday.

    @property startDay
    @type {Number}
    @private
  */
  startDay: computed('year', 'month', function () {
    let { month, year } = this.getProperties('month', 'year');
    let newCal = new Date(year, month, 1);
    let startDay = newCal.getDay() - 1;
    if (startDay < 0) {
      startDay = 6;
    }
    return startDay;
  }),

  /**
    @property weeks
    @type {Array}
    @private
  */
  weeks: computed('month', 'year', 'startDay', function () {

    const rows = 6;
    const days = 7;
    let out = A();
    let { month, year, startDay } = this.getProperties([ 'month', 'year', 'startDay' ]);
    let lastMonth = this.getLastMonth( month );
    let daily = 0;
    let dailyNextMonth = 1;
    let daysInLastMonth = getDaysInMonth({ year, month: lastMonth });
    let daysInMonth = getDaysInMonth({ year, month });
    let outOfMonthDayObject = d => {
      let y = year;
      if (0 === daily) {
        return {
          date: daysInLastMonth - (startDay - d)+1,
          month: (month => {
            let newMonth = month - 1;
            if (newMonth < 0) {
              newMonth += 12;
              y--;
            }
            return newMonth;
          })(month),
          year: y
        };
      } else {
        return {
          date: dailyNextMonth++,
          month: (month => {
            let newMonth = month + 1;
            if (newMonth > 11) {
              newMonth -= 12;
              y++;
            }
            return newMonth;
          })(month),
          year: y
        };
      }
    };

    for ( let w = 0; w < rows; w++ ) {
      let daysArray = A();

      for (let d = 0; d < days; d++) {
        // start the ball rolling when `d` is equal to `startDay`
        if ((d === startDay) && (0 === daily)) {
          daily = 1;
        }

        if ((daily > 0) && daily <= daysInMonth) {
          daysArray.pushObject(Day.create({
            date:daily++,
            month: month,
            year: year,
            inMonth: true
          }));
        } else {
          daysArray.pushObject(Day.create(outOfMonthDayObject(d)));
        }
      }

      out.pushObject(daysArray);
    }
    return out;
  }),

  /**
    Pass in a month number and this function will return the previous month.

    @method getLastMonth
    @param {Integer} month starting at 0 = January
    @private
    @return {Integer}
  */
  getLastMonth(month) {
    var lastMonth = month - 1;
    if (lastMonth < 0) {
      lastMonth += 12;
    }
    return lastMonth;
  },

  /**
    Sets the `selected` property to `model`.

    This function is called when an event is clicked.

    @method select
    @param {Object} model
    @private
  */
  select(model) {
    this.set('selected', model );
  },

  /**
    This is an empty method, it does nothing, just returns false.  It is meant
    only as a stub, to be extended, or passed in as a closure action via the
    template.

    The function will be called when an event is double-clicked.

    @method dblClick
    @private
    @return {Boolean} false
  */
  dblClick() {
    return false;
  },

  /**
    @method setToday
    @private
    @param {Object} date (optional) a `Date` object.
  */
  setToday(date) {
    if (typeOf(date) !== 'date') {
      date = new Date();
    }
    this.setViewDate(date);
  },

  /**
    @method setViewDate
    @param {Object} date A javascript `Date` object
    @private
  */
  setViewDate(date) {
    this.set('viewDate.date', date);
  },

  /**
    @method setMonth
    @param {Integer} month
    @private
  */
  setMonth(month) {
    this.set('viewDate.month', month);
    this.set('showDatePicker', false);
  },

  /**
    @method setYear
    @param {Integer} year
    @private
  */
  setYear(year) {
    this.set('viewDate.year', year);
  },

  /**
    @method nextMonth
    @private
  */
  nextMonth() {
    this.get('viewDate').incrementProperty('month');
  },

  /**
    @method prevMonth
    @private
  */
  prevMonth() {
    this.get('viewDate').decrementProperty('month');
  }
});
