import Component from '@ember/component';
import Ember from 'ember';

const { set } = Ember;

export default Component.extend({
  // Computed property needed once local storage saves set up....?
  hasSave: false,

  gameStarted: false,

  didInsertElement() {
    this._super(...arguments);
    Ember.$('.startScreen').fadeIn(2000);
  },

  actions: {
    startGame() {
      Ember.$('.startScreen').fadeOut(1500);
      Ember.run.later(() => {
        set(this, 'gameStarted', true);
      }, 1500);
    },
  },
});
