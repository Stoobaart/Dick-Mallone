import Component from '@ember/component';
import Ember from 'ember';

const { 
  $,
  run: {
    later,
  },
  set, 
} = Ember;

export default Component.extend({
  // Computed property needed once local storage saves set up....?
  hasSave: false,

  gameStarted: false,

  didInsertElement() {
    this._super(...arguments);
    $('.startScreen').fadeIn(2000);
  },

  actions: {
    startGame() {
      $('.startScreen').fadeOut(1500);
      $("#themeMusic").animate({volume: 0}, 1500);
      later(() => {
        set(this, 'gameStarted', true);
      }, 1500);
    },
  },
});
