import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('calendar');
  this.route('input-date');
  this.route('input-time');
  this.route('date-picker');
  this.route('time-picker');
});

export default Router;
