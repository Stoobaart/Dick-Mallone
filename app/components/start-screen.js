import Component from '@ember/component';
import Ember from 'ember';

const { 
  $,
  get,
  run: {
    later,
  },
  set, 
} = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  showContinue: false,

  gameStarted: false,

  didInsertElement() {
    this._super(...arguments);
    $('.startScreen').fadeIn(2000);
    if(localStorage.hasSave) {
      set(this, 'showContinue', true);
    }
  },

  actions: {
    startGame() {
      $('.startScreen').fadeOut(1500);
      $("#themeMusic").animate({volume: 0}, 1500);
      later(() => {
        set(this, 'gameStarted', true);
      }, 1500);
    },

    loadGame() {
      set(this, 'gameStarted', true);
      get(this, 'state').loadGame();
    }
  },
});
