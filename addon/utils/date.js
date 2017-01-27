/**
  @module ember-time-tools
*/
import Ember from 'ember';

const { computed } = Ember;

/**
  
  ```js
  let dateObject = DateObject.create();
  dateObject.setDate('2017/1/27');

  dateObject.get('month') // month = 0
  dateObject.set('month', 2) // month = 1
  dateObject.incrementProperty('month') // month = 2
  dateObject.decrementProperty('month') // month = 1
  dateObject.decrementProperty('month', 2) // month = 11, year = 2016
  ```

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
  date: computed('_date', 'day', 'month', 'year', {
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
  */
  day: computed('_date', {
    get() {
      return this.get('_date').getDate();
    },
    set(key, value) {
      this._modifyDate('Date', value);
      return this.get('_date').getDate();
    }
  }),

  /**
    @property month
    @type {Integer}
  */
  month: computed('_date', 'day', {
    get() {
      return this.get('_date').getMonth();
    },
    set(key, value) {
      this._modifyDate('Month', value);
      return this.get('_date').getMonth();
    }
  }),

  /**
    @property year
    @type {Integer}
  */
  year: computed('_date', 'month', 'day', {
    get() {
      return this.get('_date').getFullYear();
    },
    set(key, value) {
      this._modifyDate('FullYear', value);
      return this.get('_date').getFullYear();
    }
  }),

  /**
    @method init
    @private
  */
  init() {
    this._super(...arguments);
    this.set('_date', new Date());
  },

  /**
    ```
    dateObject.setDate('2016/7/22');
    dateObject.setDate('2016-7-22');
    dateObject.setDate(new Date(2016, 6, 22));
    dateObject.setDate(1469142000000);
    ```
    @method setDate
    @param {Object} date
    @return {Object} A javascript `Date` object
  */
  setDate(date) {
    if (Ember.typeOf(date) === 'string') {
      date = date.replace(/-/g, '/');
    } else if (Ember.typeOf(date) === 'instance') {
      date = new Date(date.get('year'), date.get('month'), date.get('date'));
    }
    return this.set('_date', new Date(date));
  },

  /**

    The `_modifyDate()` method takes two arguments.  A key and a value. The key specifies
    the part of the `Date()` object to set.  Can be either `Date`, `Month` or `FullYear`.

    ```js
    this._modifyDate('Month', 3); // set month to 3
    this._modifyDate('FullYear', 2017); // set year to 2017
    ```

    @method _modifyDate
    @param {String} key
    @param {Number} value
    @private
  */
  _modifyDate(key, value) {
    let date = this.get('_date');
    date[`set${ key }`](value);
    this.set('_date', date);
  }
});
