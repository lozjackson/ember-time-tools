/**
  @module ember-time-tools
*/

/**
  @class Utilities
  @namespace Utils
*/

/**
  Get the number of days in the month.

  The `date` object passed in should be a POJO with `month` and `year` properties.

    ```
    {
      year: 2015,
      month: 11 // starting from 0, 11 = December.
    }
    ```


  @method getDaysInMonth
  @param {Object} date
  @return {Integer} The number of days in the month
*/
export default function getDaysInMonth({ year, month }) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  year = parseInt(year);
  month = parseInt(month);

  // test for leapyear when february is selected
  if (1 === month) {
    return ((0 === year % 4) && (0 !== (year % 100))) || (0 === year % 400) ? 29 : 28;
  } else {
    return daysInMonth[month];
  }
}
