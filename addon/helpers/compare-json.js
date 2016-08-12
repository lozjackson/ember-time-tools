import Ember from 'ember';

export function compareJson([a, b]/*, hash*/) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default Ember.Helper.helper(compareJson);
