/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-calendar-week-row';

var computed = Ember.computed;

var getEvents = function (events, daysArray) {
  var results = Ember.A(),
    first,
    last;

  if (daysArray && daysArray.get('length')) {
    var firstDay = daysArray.objectAt(0);
    var lastDay = daysArray.objectAt(6);
    if ( firstDay ) {
      first = new Date(firstDay.get('year'), firstDay.get('month'), firstDay.get('date'), 0, 0, 0);
    }
    if ( lastDay ) {
      last = new Date(lastDay.get('year'), lastDay.get('month'), lastDay.get('date'), 23, 59, 59);
    }
  }

  var addEvent = function (model) {
    var newEvent = Ember.Object.create({
      event: model,
      week: {
        start: first,
        end: last
      }
    });
    results.pushObject(newEvent);
  };

  if ( events && events.get('length') ){
    events.forEach(function (event) {
      var eventStartDate = new Date(event.get('start')),
        eventEndDate = new Date(event.get('end'));

      // if the event start is in the week, or if the event starts before the week and ends after, or if the event end is within the week
      if ((eventStartDate > first && eventStartDate < last) || (eventStartDate < first && eventEndDate > last) || (eventEndDate > first && eventEndDate < last)) {
        addEvent(event);
      }
    });
  }

  return results;
};

/**
  @class CalendarWeekRowComponent
  @namespace Calendar
*/
export default Ember.Component.extend({

  /**
    @property layout
    @type {String}
  */
  layout: layout,

  /**
    @property classNames
    @type {Array}
    @default `[ 'week-row' ]`
  */
  classNames: [ 'week-row' ],

  /**
    An array of event models.

    @property model
    @type {Array}
  */
  model: [],

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
  */
  days: null,

  /**
    @property events
    @type {data_type}
  */
  events: computed('model.@each.start', 'model.@each.end', 'days.[]', function () {
    return getEvents( this.get('model'), this.get('days') );
  })
});
