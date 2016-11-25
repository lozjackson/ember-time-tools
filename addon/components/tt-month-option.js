/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-month-option';

const { computed } = Ember;

const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/**
  @class MonthOptionComponent
  @namespace Date
*/
export default Ember.Component.extend({
  layout,

  /**
    @property tagName
    @type {String}
    @private
    @default `td`
  */
  tagName: 'td',

  /**
    @property classNames
    @type {Array}
    @private
    @default `['option']`
  */
  classNames: ['option'],

  /**
    @property classNameBindings
    @type {Array}
    @private
    @default `['monthSelected']`
  */
  classNameBindings: ['monthSelected'],

  /**
    @property value
    @type {Integer}
  */

  /**
    @property monthSelected
    @type {Boolean}
    @private
  */
  monthSelected: computed('value', 'selectedMonth', function () {
    return Number(this.get('selectedMonth')) === Number(this.get('value'));
  }),

  /**
    @property monthName
    @type {String}
    @private
  */
  monthName: computed('value', function () {
    let value = this.get('value');
    return monthNames[value];
  }),

  /**
    @method click
    @private
  */
  click() {
    this.sendAction('action', Number(this.get('value')));
  }
});
