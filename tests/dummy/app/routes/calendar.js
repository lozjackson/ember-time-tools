import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    var events = [
      Ember.Object.create({
        id: 1,
        description: 'An event',
        start:  new Date(2016,5,8,11,0,0).getTime(),
        end : new Date(2016,5,11,11,0,0).getTime()
      }),

      Ember.Object.create({
        id: 2,
        description: 'A long event',
        start:  new Date(2016,5,13,11,0,0).getTime(),
        end : new Date(2016,5,18,11,0,0).getTime()
      }),
      Ember.Object.create({
        id: 3,
        description: 'Conference',
        start:  new Date(2016,5,14,11,0,0).getTime(),
        end : new Date(2016,5,15,11,0,0).getTime()
      })
    ];
    return Ember.A(events);
  }
});
