import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('calendar');
  this.route('input-date');
  this.route('input-time');
  this.route('date-picker');
  this.route('time-picker');
});

export default Router;
