/**
  @module ember-time-tools
*/
import Ember from 'ember';
import moment from 'moment';
/**
  @class FormatDateHelper
  @namespace Helpers
*/

/**
  @method formatDate
  @param {Object} date
  @param {String} format
  @return {String}
*/
export function formatDate([date, format]) {
  var formatString = '';

  switch (format) {
    case 'date-and-time':
      formatString = 'DD/MM/YYYY h:mm a';
      break;
    case 'date-with-day':
      formatString = 'ddd DD/MM/YYYY';
      break;
    case 'short':
      formatString = 'DD/MM/YYYY';
      break;
    case 'standard':
      formatString = 'ddd Do, MMM YYYY';
      break;
    case 'time':
      formatString = 'h:mm a';
      break;
    default:
      if (!format) {
        format = 'DD/MM/YYYY';
      }
      formatString = format;
      break;
  }
  if (typeof date === 'string') {
    date = date.replace(/\//g, '-');
  }
  return moment(date).format(formatString);
}

export default Ember.Helper.helper(formatDate);
