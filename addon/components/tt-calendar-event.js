/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-calendar-event';

const { computed } = Ember;
const { alias } = computed;

/**
  @class CalendarEventComponent
  @namespace Calendar
*/
export default Ember.Component.extend({
  layout: layout,

  /**
    @property tagName
    @type {String}
    @default `li`
    @private
  */
  tagName: 'li',

  /**
    @property classNames
    @type {Array}
    @default `['calendar-event']`
    @private
  */
  classNames: ['calendar-event'],

  /**
    @property classNameBindings
    @type {Array}
    @default `['selected']`
    @private
  */
  classNameBindings: ['selected'],

  /**
    An EventObject

    @property model
    @type {Object}
  */
  model: null,

  /**
    Alias of `model.description`.

    @property description
    @type {String}
    @private
  */
  description: alias('model.description'),

  /**
    @property selected
    @type {Boolean}
    @private
  */
  selected: computed('selectedEvent', 'model', function () {
    let { selectedEvent, model } = this.getProperties( 'selectedEvent', 'model' );
    return selectedEvent === model;
  }),

  /**
    @event click
    @private
  */
  click(event) {
    let { model, select } = this.getProperties('model', 'select');

    if (typeof select === 'function') {
      select(model, event);
    }
    return false;
  }
});
