/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-calendar-month';
import eventTemplate from '../templates/components/tt-calendar-month-event';

const computed = Ember.computed;

var Day = Ember.Object.extend({
  date: null,
  month: null,
  year: null,
  inMonth: false
});

/**
  @class CalendarMonthComponent
  @namespace Calendar
*/
export default Ember.Component.extend({
  layout,

  /**
    This is the template to use for the events displayed in the calendar.

    @property eventTemplate
    @type {String}
  */
  eventTemplate: eventTemplate,

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
  dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

  /**
    @property monthNames
    @type {Array}
    @default `['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']`
  */
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

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
  sortProperties: ['start:asc', 'end:asc'],

  /**
    Sorts the `events` array.

    @property sortedEvents
    @type {Array}
    @private
  */
  sortedEvents: computed.sort('events', 'sortProperties'),

  /**
    The selected model/event.

    @property selected
    @type {Object}
  */
  selected: null,

  /**
    A `Date()` object representing the currently selected date.

    @property selectedDate
    @type {Object}
  */
  selectedDate: null,

  /**
    @method init
    @private
  */
  init: function () {
    this.setToday();
    return this._super();
  },

  /**
    The year of the `selectedDate`.

    @property year
    @type {Number}
    @private
  */
  year: computed( 'selectedDate', function() {
    var date = this.get('selectedDate') || new Date();
    return date.getFullYear();
  }),

  /**
    The month of the `selectedDate`.

    @property month
    @type {Number}
    @private
  */
  month: computed( 'selectedDate', function() {
    var date = this.get('selectedDate') || new Date();
    return date.getMonth();
  }),

  /**
    The month name string.. ie. 'January'.

    @property monthName
    @type {String}
    @private
  */
  monthName: computed( 'month', 'monthNames', function () {
    var { month, monthNames } = this.getProperties([ 'month', 'monthNames' ]);
    return monthNames[ month ];
  }),

  /**
    The number of the day ofthe week that the calendar will start on.
    Day numbers start at 0 = monday.

    @property startDay
    @type {Number}
    @private
  */
  startDay: computed( 'year', 'month', function () {
    var month = this.get('month'),
      year = this.get('year'),
      newCal = new Date(year, month, 1),
      startDay = newCal.getDay() - 1;

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
  weeks: computed( 'month', 'year', 'startDay', function () {

    const rows = 6;
    const days = 7;
    var out = Ember.A();
    var { month, year, startDay } = this.getProperties([ 'month', 'year', 'startDay' ]);
    var lastMonth = this.getLastMonth( month );
    var daily = 0;
    var dailyNextMonth = 1;
    var daysInLastMonth = this.getDaysInMonth({ year:year, month: lastMonth });
    var daysInMonth = this.getDaysInMonth({ year:year, month:month });
    var outOfMonthDayObject = function (d) {
      var y = year;
      if ( 0 === daily ) {
        return {
          date: daysInLastMonth - (startDay - d)+1,
          month: (function (month) {
            var newMonth = month - 1;
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
          month: (function (month) {
            var newMonth = month + 1;
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

    for ( var w = 0; w < rows; w++ ) {
      var daysArray = Ember.A();

      for (var d = 0; d < days; d++) {
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
          daysArray.pushObject( Day.create( outOfMonthDayObject( d ) ) );
        }
      }

      out.pushObject( daysArray );
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
    Get the number of days in the month.

    The `date` object passed in should be a POJO with `month` and `year` properties.

      ```
      {
        year: 2015,
        month: 11 // starting from 0, 11 = December.
      }
      ```


    @method getDaysInMonth
    @param {Object} date
    @private
    @return {Integer} The number of days in the month
  */
  getDaysInMonth(date) {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var year = parseInt(date.year),
      month = parseInt(date.month);

    // test for leapyear when february is selected
    if (1 === month) {
      return ((0 === year % 4) && (0 !== (year % 100))) || (0 === year % 400) ? 29 : 28;
    } else {
      return daysInMonth[month];
    }
  },

  /**
    Sets the `selected` property to `model`.

    This function is called when an event is clicked.

    @method select
    @param {Object} model
    @private
  */
  select( model ) {
    this.set( 'selected', model );
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
  setToday: function (date) {
    if (!date) {
      date = new Date();
    }
    this.set('selectedDate', date);
  },

  /**
    @method _nextMonth
    @private
  */
  _nextMonth() {
    var date = this.get('selectedDate');
    if ( !date ) {
      date = new Date();
    }
    date.setMonth(date.getMonth() + 1);
    this.set('selectedDate', new Date(date));
  },

  /**
    @method _prevMonth
    @private
  */
  _prevMonth: function () {
    var date = this.get('selectedDate');
    if ( !date ) {
      date = new Date();
    }
    date.setMonth(date.getMonth() - 1);
    this.setToday(new Date(date));
  },

  actions: {
    /**
      ACTION

      @method nextMonth
    */
    nextMonth() {
      this._nextMonth();
    },

    /**
      ACTION

      @method prevMonth
    */
    prevMonth() {
      this._prevMonth();
    },

    /**
      ACTION

      @method today
    */
    today: function () {
      this.setToday();
    }
  }
});
