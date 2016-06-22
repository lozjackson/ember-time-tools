/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-date-picker';
import DateObject from 'ember-time-tools/utils/date';

const { computed } = Ember;
const { readOnly } = computed;
/*
  @param daysInMonth
    The number of days in each month.
*/
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/*
  @method getDays
    gets the number of days in the month (tests for leap years)

  @param (Integer) month

  @param (Integer) year

  @return (Integer)
    The number of days in the month.
*/
function getDays(date) {
  let year = parseInt(date.year),
    month = parseInt(date.month);

  // Test for leap year when February is selected.
  if (1 === month) {
    return ((0 === year % 4) && (0 !== (year % 100))) || (0 === year % 400) ? 29 : 28;
  } else {
    return daysInMonth[month];
  }
}

// /*
//   @method Today
//     Generate today's date.  if the `date` param is provided then use that date.
//
//     Create an instance of Today. and it will have the properties date, day, month, year.
//
//     var today = new Today(); // 25/03/2015
//     console.log(today.day); // 25
// */
// function Today (date) {
//   if (!date) {
//     this.date = new Date();
//   } else {
//     if (typeof date === 'number') {
//       this.date = new Date(date);
//     } else if (typeof date === 'string') {
//       date = date.replace(/-/g, '/');
//       this.date = new Date(date);
//     }  else {
//       this.date = date;
//     }
//   }
//   this.year = this.date.getFullYear();
//   this.month = this.date.getMonth();
//   this.day = this.date.getDate();
// }

/**
  @class DatePickerComponent
  @namespace DateTime
*/
export default Ember.Component.extend({

  layout,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['tt-date-picker', 'container']`
  */
  classNames: ['tt-date-picker', 'container'],

  /**
    An array of month names.
    @property months
    @type {Array}
    @private
  */
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

  /**
    0 = Sunday, 1 = Monday

    @property weekStart
    @type {Integer}
    @private
    @default `1`
  */
  weekStart: 1,

  /**
    The number of week rows to display in the calendar.

    @property numberOfWeeks
    @type {Integer}
    @private
    @default 6
  */
  numberOfWeeks: 6,

  /**
    @property selectedDate
    @type {Number}
    @private
  */
  selectedDate: null,

  /**
    @property viewDate
    @type {Object}
    @private
  */
  viewDate: null,

  /**
    @property year
    @type {Number}
    @readonly
    @private
  */
  year: readOnly('viewDate.year'),

  /**
    @property month
    @type {Number}
    @readonly
    @private
  */
  month: readOnly('viewDate.month'),

  /**
    An Ember.Array containing an object for each day of the week.  Each object
    has a `name` property that is used for the day title.

    @property daysOfWeek
    @type {Array}
    @private
  */
  daysOfWeek: computed('weekStart', function() {
    let array = Ember.A(),
      weekStart = this.get('weekStart'),
      daysArray = ["S", "M", "T", "W", "T", "F", "S"];

    if (weekStart === 1) {
      daysArray.push(daysArray.shift());
    }

    for (let i = 0, d = daysArray.length; i < d; i++) {
      array.pushObject({name:daysArray[i]});
    }
    return array;
  }),

  /**
    The name of the month specified by `month`.

    @property monthName
    @type {String}
    @private
  */
  monthName: computed('month', 'months', function () {
    return this.get('months')[this.get('month')];
  }),

  /**
    @property weeks
    @type {Array}
    @private
  */
  weeks: computed('daysOfWeek.[]', 'month', 'year', 'numberOfWeeks', 'startDay', function() {
    let dayObj, date, intWeek, intDay, week,
      daily = 0,
      dailyNextMonth = 1,
      weeksArray = Ember.A(),
      daysOfWeek = this.get('daysOfWeek.length'),
      { month, year, numberOfWeeks, startDay } = this.getProperties('month', 'year', 'numberOfWeeks', 'startDay'),
      daysInMonth = getDays({ year, month });

    for (intWeek = 0; intWeek < numberOfWeeks;  intWeek++) {
      week = Ember.A();

      for (intDay = 0;intDay < daysOfWeek; intDay++) {
        // start the ball rolling when intDay is equal to startDay
        if ((intDay === startDay) && (0 === daily)) {
          daily = 1;
        }
        if ((daily > 0) && (daily <= daysInMonth)) {
          dayObj = {
            date: daily++,
            month: month,
            year: year,
            inRange: true
          };
        } else {
          if (0 === daily) {
            date = new Date(year, month, 1);
            date.setDate(date.getDate() - (startDay - intDay));
          } else {
            date = new Date(year, month + 1, 0);
            date.setDate(date.getDate() + dailyNextMonth++);
          }

          dayObj = {
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            inRange: false
          };
        }
        week.pushObject(Ember.Object.create(dayObj));
      }
      weeksArray.pushObject(week);
    }
    return weeksArray;
  }),

  startDay: computed( 'year', 'month', 'weekStart', function () {
    let { month, year } = this.getProperties('month', 'year'),
      newCal = new Date(year, month, 1),
      startDay = newCal.getDay() - this.get('weekStart');

    if (startDay < 0) {
      startDay = 6;
    }

    return startDay;
  }),

  /**
    @method init
    @private
  */
  init() {
    this._super(...arguments);
    let selectedDate = this.get('selectedDate');
    this.set('viewDate', DateObject.create());
    if (selectedDate) {
      this.setViewDate(selectedDate);
    }
  },

  /**
    Set `viewDate` to today.

    @method setToday
    @private
  */
  setToday() {
    this.setViewDate(new Date());
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
    @method _selectDay
    @param {Object} day
    @private
  */
  _selectDay(day) {
    this.sendAction('select', day);
  },

  /**
    @method _prevMonth
    @private
  */
  _prevMonth() {
    this.get('viewDate').decrementMonth();
  },

  /**
    @method _nextMonth
    @private
  */
  _nextMonth() {
    this.get('viewDate').incrementMonth();
  },

  actions: {

    /**
      ACTION - Send action 'select'

      @method selectDay
      @param {Object} day
    */
    selectDay(day) {
      this._selectDay(day)
    },

    /**
      ACTION - change the `viewDate` to the previous month.

      @method prevMonth
    */
    prevMonth() {
      this._prevMonth();
    },

    /**
      ACTION - change the `viewDate` to the next month.

      @method nextMonth
    */
    nextMonth() {
      this._nextMonth();
    },

    /**
      ACTION - Calls `this.setToday()`.

      @method today
    */
    today() {
      this.setToday();
    },

    /**
      ACTION - Send action 'close'.
      @method close
    */
    close() {
      this.sendAction('close');
    }
  }
});