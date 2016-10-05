import Ember from 'ember';
import moment from 'moment';

const { get } = Ember;

function convertObjectToString(date) {
  return `${ get(date, 'year') }/${ get(date, 'month')+1 }/${ get(date, 'date') }`;
}

export default function format(date, format = 'date') {
  let inputType = Ember.typeOf(date);

  switch(format) {

    case 'date':
      if (inputType !== 'date') {
        if (inputType === 'instance') {
          date = convertObjectToString(date);
        }
        date = new Date(date);
      }
      break;

    case 'timestamp':
      if (inputType !== 'number') {
        if (inputType === 'instance') {
          date = new Date(convertObjectToString(date));
        } else if (inputType !== 'date') {
          date = new Date(date);
        }
        date = date.getTime();
      }
      break;

    case 'object':
      if (inputType !== 'instance') {
        if (inputType !== 'date') {
          date = new Date(date);
        }
        date = Ember.Object.create({
          year: date.getFullYear(),
          month: date.getMonth(),
          date: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
          second: date.getSeconds()
        });
      }
      break;

    // parse custom format
    default:
      let _date;
      if (inputType === 'string') {
        _date = moment(date, format);
      } else {
        _date = moment(date);
      }
      if (_date && _date !== 'Invalid date') {
        date = _date.format(format);
      }
      break;
  }
  return  date;
}
