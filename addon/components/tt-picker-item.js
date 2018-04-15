/**
  @module ember-time-tools
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-picker-item';
import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';

/**
  @class PickerItemComponent
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
    @property classNameBindings
    @type {Array}
    @private
    @default `['model.inRange::out-of-range', 'daySelected', 'today', 'weekend']`
  */
  classNameBindings: ['model.inRange::out-of-range', 'daySelected', 'today', 'weekend'],

  /**
    @property daySelected
    @type {Boolean}
    @private
  */
  daySelected: computed( 'selectedDate', 'model.year', 'model.month', 'model.date', function () {
    let selectedDate = this.get('selectedDate');
    let selectedDateType = typeOf(selectedDate);
    let selected;

    if (selectedDateType === 'date') {
      selected = selectedDate;
    } else {
      if (selectedDateType === 'number') {
        selected = new Date(selectedDate);
      } else if (selectedDateType === 'string') {
        selected = new Date(selectedDate.replace(/-/g, '/'));
      } else if (selectedDateType === 'instance') {
        selected = new Date(selectedDate.get('year'), selectedDate.get('month'), selectedDate.get('date'));
      }
    }

    let model = this.get('model');
    if (!selected || !model) { return false; }
    let { year, month, date } = model.getProperties('year', 'month', 'date');
		return (selected.getDate() === date && selected.getMonth() === month && selected.getFullYear() === year) ? true : false;
	}),

  /**
    @property today
    @type {Boolean}
    @private
  */
  today: computed( 'model.year', 'model.month', 'model.date', function () {
    let today = new Date();
    let model = this.get('model');
    if (!model) { return false; }
    let { year, month, date } = model.getProperties('year', 'month', 'date');
    return (today.getDate() === date && today.getMonth() === month && today.getFullYear() === year) ? true : false;
  }),

  /**
    @property weekend
    @type {Boolean}
    @private
  */
	weekend: computed( 'model.year', 'model.month', 'model.date', function () {
    let model = this.get('model');
    if (!model) {
      return false;
    }
    let {year, month, date} = model.getProperties('year', 'month', 'date');
    let day = new Date(year, month, date);
    return (day.getDay() === 0 || day.getDay() === 6) ? true: false;
	}),

  /**
    @method click
    @private
  */
  click() {
    this.sendAction('select', this.get('model'));
  }
});
