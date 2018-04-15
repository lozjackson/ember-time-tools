/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-calendar-week-row';

/**
  @class CalendarWeekRowComponent
  @namespace Calendar
*/
export default Component.extend({

  /**
    @property layout
    @type {String}
    @private
  */
  layout: layout,

  /**
    @property classNames
    @type {Array}
    @private
    @default `['week-row']`
  */
  classNames: ['week-row'],

  /**
    An array of event models.

    @property events
    @type {Array}
  */

  /**
    An array of `Day` objects to display for this week (row) of the calendar.

      ```
      var Day = Ember.Object.extend({
        date: {Integer}, // 1-31
        month: {Integer},// 0-11
        year: {Integer},
        inMonth: true
      });
      ```

    There should be 7 days.  1 for each day of the week (starting on monday).

    @property days
    @type {Array}
    @private
  */
  days: null
});
