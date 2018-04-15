/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-year-option';
import { computed, get } from '@ember/object';

/**
  @class YearOptionComponent
  @namespace Date
*/
export default Component.extend({
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
    @default `['yearSelected']`
  */
  classNameBindings: ['yearSelected'],

  /**
    @property unit
    @type {Integer}
  */
  unit: 0,

  /**
    @property decade
    @type {Integer}
  */

  /**
    @property selectedYear
    @type {Integer}
  */

  /**
    `value` = `decade` + `unit`

    @property value
    @type {Integer}
  */
  value: computed('decade', 'unit', function () {
    let { decade, unit } = this.getProperties('decade', 'unit');
    return Number(decade) + Number(unit);
  }),

  /**
    @property yearSelected
    @type {Boolean}
    @private
  */
  yearSelected: computed('value', 'selectedYear', function () {
    return this.get('selectedYear') === this.get('value');
  }),

  /**
    @method click
    @private
  */
  click() {
    const setYear = get(this, 'setYear');
    if (typeof setYear === 'function') {
      setYear(Number(this.get('value')));
    }
  }
});
