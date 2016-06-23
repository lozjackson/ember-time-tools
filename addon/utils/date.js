/**
  @module ember-time-tools
*/
import Ember from 'ember';

const { computed } = Ember;

/**
  @class DateObject
  @namespace Utils
*/
export default Ember.Object.extend({

  /**
    javascript `Date()` object
    @property _date
    @type {Object}
    @private
  */
  _date: null,

  /**

    ```
    dateObject.set('date', '2016/7/22');
    dateObject.set('date', '2016-7-22');
    dateObject.set('date', new Date(2016, 6, 22));
    dateObject.set('date', 1469142000000);
    ```

    @property date
    @type {Object}
  */
  date: computed('_date', {
    get() {
      return this.get('_date');
    },
    set(key, value) {
      return this.setDate(value);
    }
  }),

  /**
    @property day
    @type {Integer}
    @readonly
  */
  day: null,

  /**
    @property month
    @type {Integer}
    @readonly
  */
  month: null,

  /**
    @property year
    @type {Integer}
    @readonly
  */
  year: null,

  /**
    @method init
    @private
  */
  init() {
    this._super(...arguments);
    this._setDate(new Date());
  },

  /**
    ```
    dateObject.setDate('2016/7/22');
    dateObject.setDate('2016-7-22');
    dateObject.setDate(new Date(2016, 6, 22));
    dateObject.setDate(1469142000000);
    ```
    @method _setDate
    @param {Object} date
  */
  setDate(date) {
    if (Ember.typeOf(date) !== 'date') {
      if (Ember.typeOf(date) === 'number') {
        date = new Date(date);
      } else if (Ember.typeOf(date) === 'string') {
        date = new Date(date.replace(/-/g, '/'));
      } else if (Ember.typeOf(date) === 'instance') {
        date = new Date(date.get('year'), date.get('month'), date.get('date'));
      }
    }
    return this._setDate(date);
  },

  /**
    @method _setDate
    @param {Object} date A javascript `Date` object
    @private
  */
  _setDate(date) {
    if (!date) { return; }
    this.setProperties({
      _date: date,
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    });
    return date;
  },

  /**
    @method _modifyDate
    @param {String} name The part of the date to set. `Date`, `Month` or `FullYear`.
    @param {Number} number The number add.  Defaults to 1.
    @private
  */
  _modifyDate(name, number = 1) {
    let date = this.get('_date');
    date[`set${name}`](date[`get${name}`]() + number);
    this._setDate(date);
  },

  /**
    @method incrementDay
    @param {Number} number
  */
  incrementDay(number = 1) {
    this._modifyDate('Date', number);
  },

  /**
    @method decrementDay
    @param {Number} number
  */
  decrementDay(number = 1) {
    this._modifyDate('Date', number * -1);
  },

  /**
    @method incrementMonth
    @param {Number} number
  */
  incrementMonth(number = 1) {
    this._modifyDate('Month', number);
  },

  /**
    @method decrementMonth
    @param {Number} number
  */
  decrementMonth(number = 1) {
    this._modifyDate('Month', number * -1);
  },

  /**
    @method incrementYear
    @param {Number} number
  */
  incrementYear(number = 1) {
    this._modifyDate('FullYear', number);
  },

  /**
    @method decrementYear
    @param {Number} number
  */
  decrementYear(number = 1) {
    this._modifyDate('FullYear', number * -1);
  }
});
