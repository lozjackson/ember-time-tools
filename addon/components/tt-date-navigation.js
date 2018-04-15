/**
  @module arms
*/
import Component from '@ember/component';
import layout from '../templates/components/tt-date-navigation';

/**
  
  ```hbs
  {{tt-date-navigation
    back=(action prevMonth)
    today=(action setToday)
    forward=(action nextMonth)}}
  ```

  @class DateNavigationComponent
  @namespace Date
*/
export default Component.extend({
  layout,

  /**
    @property classNames
    @type {Array}
    @default ['uic-button-group', 'navigation', 'extra-small']
    @private
  */
  classNames: ['uic-button-group', 'navigation', 'extra-small']
});
