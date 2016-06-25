/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-calendar-month-event';

var computed = Ember.computed;
var alias = computed.alias;

/**
  @class CalendarMonthEventComponent
  @namespace Calendar
*/
export default Ember.Component.extend({
  layout: layout,

  /**
    @property classNames
    @type {Array}
    @default `[ 'event' ]`
    @private
  */
  classNames: [ 'event' ],

  /**
    @property classNameBindings
    @type {Array}
    @default `[ 'continuedLeft', 'continuedRight' ]`
    @private
  */
  classNameBindings: [ 'continuedLeft', 'continuedRight', 'hover', 'selected' ],

  selected: computed( 'selectedEvent', 'event', function () {
    var { selectedEvent, event } = this.getProperties( 'selectedEvent', 'event' );
    return selectedEvent === event;
  }),

  /**
    @property attributeBindings
    @type {Array}
    @default `[ 'style' ]`
    @private
  */
  attributeBindings: [ 'style' ],

  style: computed( 'eventStart', 'eventEnd', 'startOfWeek', 'endOfWeek', function () {

    //1 day = 86,400,000
    //1 week = 604,800,000
    var { eventStart, eventEnd, startOfWeek, endOfWeek } = this.getProperties([ 'eventStart', 'eventEnd', 'startOfWeek', 'endOfWeek' ]);
    var left = 0, right = 0;
    if ( startOfWeek && endOfWeek ) {
      var oneHundrethOfAWeek = 100/604800000;
      left = oneHundrethOfAWeek * (eventStart - startOfWeek.getTime()); //start = number Of seconds since start of week
      right = oneHundrethOfAWeek * (endOfWeek.getTime() - eventEnd);
    }
    if ( left < 0 ) { left = 0; }
    else if ( left > 100 ) { left = 100; }

    if ( right < 0 ) { right = 0; }
    else if ( right > 100 ) { right = 100; }

    return new Ember.Handlebars.SafeString(`left: ${left}%; right: ${right}%;`);
  }),

  /**
    An event model/object. Should be an Ember Object with two properties. An `event`
    property that is the event model.  And a `week` property that is the week that
    this event is being displayed on.

      Ember.Object.create({
        event: model,
        week: Ember.Object.create({
          start: startOfWeek,
          end: endOfWeek
        })
      });

    The `week` object has 2 properties.  `start` is the start of the week, `end`
    is the end of the week.

    @property model
    @type {Object}
  */
  model: null,

  /**
    Alias of `model.event`.

    @property event
    @type {Object}
    @private
  */
  event: alias('model.event'),

  /**
    @property eventStart
    @type {Number}
    @private
  */
  eventStart: alias('event.start'),

  /**
    @property eventEnd
    @type {Number}
    @private
  */
  eventEnd: alias('event.end'),

  /**
    @property startOfWeek
    @type {Object}
    @private
  */
  startOfWeek: alias('model.week.start'),

  /**
    @property endOfWeek
    @type {Object}
    @private
  */
  endOfWeek: alias('model.week.end'),

  /**
    Alias of `model.description`.

    @property description
    @type {String}
    @private
  */
  description: alias('event.description'),

  /**
    True if the event starts before the start of the week.

    @property continuedLeft
    @type {Boolean}
    @private
  */
  continuedLeft: computed( 'eventStart', 'startOfWeek', function () {
    var { eventStart, startOfWeek } = this.getProperties([ 'eventStart', 'startOfWeek' ]);
    return ( new Date(eventStart) < startOfWeek ) ? true : false;
  }),

  /**
    True if the event continues past the end of the week.

    @property continuedRight
    @type {Boolean}
    @private
  */
  continuedRight: computed( 'eventEnd', 'endOfWeek', function () {
    var { eventEnd, endOfWeek } = this.getProperties([ 'eventEnd', 'endOfWeek' ]);
    return ( new Date(eventEnd) > endOfWeek ) ? true : false;
  }),

  /**
    Alias of `model.event.hover`
    @property hover
    @type {Boolean}
    @private
  */
  hover: alias('event.hover'),

  /**
    @event click
    @private
  */
  click() {
    var { event, select } = this.getProperties([ 'event', 'select' ]);
    if (typeof select === 'function') {
      select(event);
    }
    return false;
  },

  /**
    @event doubleClick
    @private
  */
  doubleClick: function () {
    var { event, dblClick } = this.getProperties([ 'event', 'dblClick' ]);
    if (typeof dblClick === 'function') {
      dblClick(event);
    }
    return false;
  },

  /**
    @event mouseEnter
    @private
  */
  mouseEnter: function () {
    this.set( 'hover', true );
	},

  /**
    @event mouseLeave
    @private
  */
	mouseLeave: function () {
    this.set( 'hover', false );
	}
});
