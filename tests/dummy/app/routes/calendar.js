import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { A } from '@ember/array';

const MONTH = new Date().getMonth();
const YEAR = new Date().getFullYear();

export default Route.extend({

  model() {
    var events = [
      EmberObject.create({
        id: 1,
        description: 'An event',
        start:  new Date(YEAR, MONTH ,8,9,0,0).getTime(),
        end : new Date(YEAR, MONTH ,11,9,0,0).getTime()
      }),

      EmberObject.create({
        id: 2,
        description: 'Another event',
        start:  new Date(YEAR, MONTH ,8,10,0,0).getTime(),
        end : new Date(YEAR, MONTH ,11,10,0,0).getTime()
      }),

      EmberObject.create({
        id: 3,
        description: 'A long event',
        start:  new Date(YEAR, MONTH ,18,0,0,0).getTime(),
        end : new Date(YEAR, MONTH ,23,0,0,0).getTime()
      }),
      EmberObject.create({
        id: 4,
        description: 'Conference',
        start:  new Date(YEAR, MONTH ,14,0,0,0).getTime(),
        end : new Date(YEAR, MONTH ,15,0,0,0).getTime()
      })
    ];
    return A(events);
  }
});
