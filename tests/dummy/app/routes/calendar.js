import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    var events = [
      Ember.Object.create({
        id: 1,
        description: 'An event',
        start:  new Date(2017,0,8,9,0,0).getTime(),
        end : new Date(2017,0,11,9,0,0).getTime()
      }),

      Ember.Object.create({
        id: 2,
        description: 'Another event',
        start:  new Date(2017,0,8,10,0,0).getTime(),
        end : new Date(2017,0,11,10,0,0).getTime()
      }),

      Ember.Object.create({
        id: 3,
        description: 'A long event',
        start:  new Date(2017,0,18,0,0,0).getTime(),
        end : new Date(2017,0,23,0,0,0).getTime()
      }),
      Ember.Object.create({
        id: 4,
        description: 'Conference',
        start:  new Date(2017,0,14,0,0,0).getTime(),
        end : new Date(2017,0,15,0,0,0).getTime()
      })
    ];
    return Ember.A(events);
  }
});
