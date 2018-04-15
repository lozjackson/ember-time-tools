/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-date-picker';
import DateObject from 'ember-time-tools/utils/date';
import ClickOutsideMixin from 'ember-ui-components/mixins/click-outside';
import SetPositionMixin from 'ember-time-tools/mixins/set-position';
import EmberObject, { get, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';

/*
  @param daysInMonth
    The number of days in each month.
*/
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

/**
  @class DatePickerComponent
  @uses Mixins.SetPositionMixin
  @namespace Date
*/
export default Component.extend(ClickOutsideMixin, SetPositionMixin, {

  layout,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['tt-date-picker', 'tt-container']`
  */
  classNames: ['tt-date-picker', 'tt-container'],

  /**
    An array of month names.
    @property months
    @type {Array}
    @private
  */
  months,

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
    ### Output

    Options:

    * date - javascript `Date` object.
    * timestamp - number of seconds.
    * object - `Ember.Object` with `year`, `month` and `date` properties.

    @property output
    @type {String}
    @default 'date'
  */
  output: 'date',

  /**
    @property selectedDate
    @type {Number}
  */
  selectedDate: null,

  /**
    @property viewDate
    @type {Object}
    @private
  */
  viewDate: null,

  /**
    @property viewMode
    @type {String}
    @private
    @default `date`
  */
  viewRange: 'date',

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
    Returns an object with the start and end of the decade.  Given the year 2016
    the `decade` {Object} would be `{ start: 2010, end: 2019 }`

    @property decade
    @type {Object}
    @private
  */
  decade: computed('year', function () {
    let start = Math.floor(this.get('year')/10)*10;
    return {
      start,
      end: start + 9
    };
  }),

  /**
    An Ember.Array containing an object for each day of the week.  Each object
    has a `name` property that is used for the day title.

    @property daysOfWeek
    @type {Array}
    @private
  */
  daysOfWeek: computed('weekStart', function() {
    let array = A(),
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
    @property displayMonths
    @type {Boolean}
    @private
    @readonly
  */
  displayMonths: computed('viewRange', function () {
    return this.get('viewRange') === 'month';
  }),

  /**
    @property displayYears
    @type {Boolean}
    @private
    @readonly
  */
  displayYears: computed('viewRange', function () {
    return this.get('viewRange') === 'year';
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
      weeksArray = A(),
      daysOfWeek = this.get('daysOfWeek.length'),
      { month, year, numberOfWeeks, startDay } = this.getProperties('month', 'year', 'numberOfWeeks', 'startDay'),
      daysInMonth = getDays({ year, month });

    for (intWeek = 0; intWeek < numberOfWeeks;  intWeek++) {
      week = A();

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
        week.pushObject(EmberObject.create(dayObj));
      }
      weeksArray.pushObject(week);
    }
    return weeksArray;
  }),

   /**
    @property startDay
    @type {Integer}
    @private
  */
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
    if (!this.get('viewDate')) {
      this.set('viewDate', DateObject.create());
    }
    if (selectedDate) {
      this.setViewDate(selectedDate);
    }
  },

  /**
    @method handleClickOutside
    @private
  */
  handleClickOutside() {
    if (this.get('isDestroyed') || this.get('isDestroying')) { return; }
    this._close();
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
    `day` is an object with `date`, `month` and `year` properties.

    @method _selectDate
    @param {Object} day
    @private
  */
  _selectDate(day) {
    let output = this.get('output');
    let date = new Date(get(this, 'selectedDate') || 0);
    date.setFullYear(day.year, day.month, day.date);
    if (output) {
      switch(output) {
        case 'date':
          day = date;
          break;
        case 'timestamp':
          day = date.getTime();
          break;
        case 'object':
          day = EmberObject.create({
            year: day.year,
            month: day.month,
            date: day.date,
            _date: date,
            timestamp: date.getTime()
          });
          break;
        default:
          day = EmberObject.create({
            year: day.year,
            month: day.month,
            date: day.date,
            _date: date,
            timestamp: date.getTime()
          });
          break;
      }
    }
    const select = get(this, 'select');
    if (typeof select === 'function') {
      select(day);
    } else {
      this.set('selectedDate', day);
    }

  },

  /**
    @method chooseMonth
    @private
  */
  chooseMonth() {
    this.set('viewRange', 'month');
  },

  /**
    @method chooseYear
    @private
  */
  chooseYear() {
    this.set('viewRange', 'year');
  },

  /**
    @method _setMonth
    @param {Integer} month
    @private
  */
  _setMonth(month) {
    this.set('viewDate.month', month);
    this.set('viewRange', 'date');
  },

  /**
    @method _setYear
    @param {Integer} year
    @private
  */
  _setYear(year) {
    this.set('viewDate.year', year);
    this.set('viewRange', 'month');
  },

  /**
    @method _prevMonth
    @private
  */
  _prevMonth() {
    this.get('viewDate').decrementProperty('month');
  },

  /**
    @method _nextMonth
    @private
  */
  _nextMonth() {
    this.get('viewDate').incrementProperty('month');
  },

  /**
    @method prevYear
  */
  prevYear() {
    this.get('viewDate').decrementProperty('year');
  },

  /**
    @method nextYear
  */
  nextYear() {
    this.get('viewDate').incrementProperty('year');
  },

  /**
    @method prevDecade
  */
  prevDecade() {
    let { decade: { start }, month } = this.getProperties('decade', 'month');
    this.set('viewDate.date', `${ parseInt(start) - 10 }/${ month + 1 }/1`);
  },

  /**
    @method nextDecade
  */
  nextDecade() {
    let { decade, month } = this.getProperties('decade', 'month');
    this.set('viewDate.date', `${ parseInt(decade.start) + 10 }/${ month + 1 }/1`);
  },

  _close() {
    const close = get(this, 'close');
    if (typeof close === 'function') {
      close();
    }
  },

  actions: {

    /**
      ACTION - Send action 'select'

      @method selectDay
      @param {Object} day
    */
    selectDay(day) {
      this._selectDate(day);
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
      @method setMonth
      @param {Integer} month
    */
    setMonth() {
      this._setMonth(...arguments);
    },

    /**
      @method setYear
      @param {Integer} year
    */
    setYear() {
      this._setYear(...arguments);
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
      this._close();
    }
  }
});
