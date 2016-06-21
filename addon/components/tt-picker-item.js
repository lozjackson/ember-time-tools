/**
  @module ember-time-tools
*/
import Ember from 'ember';
import layout from '../templates/components/tt-picker-item';

const { computed } = Ember;

/**
  @class PickerItemComponent
  @namespace Components
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
    if (typeof selectedDate === 'string') {
      selectedDate = selectedDate.replace(/-/g, '/');
    }
    let selected = new Date(selectedDate);
    let model = this.get('model');
    if (!model) { return false; }
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
