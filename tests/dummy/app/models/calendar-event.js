// BEGIN-SNIPPET calendar-event-model
import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  description: attr(),    // name of event
  start:  attr('number'), // timestamp, number of seconds
  end : attr('number')    // timestamp, number of seconds
});
// END-SNIPPET
