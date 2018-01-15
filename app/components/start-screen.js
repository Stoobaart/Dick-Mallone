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
    $("#themeMusic")[0].volume = 0;
    $("#themeMusic")[0].play();
    $("#themeMusic").animate({volume: 1}, 3500);

    $('.devStudioLogoScreen').fadeIn(4000);
    later(() => {
      $('.devStudioLogoScreen').fadeOut(3000);
      later(() => {
        $('.startScreen').fadeIn(2000);
        if(localStorage.saveGame) {
          set(this, 'showContinue', true);
        }
        later(() => {
          $('.mainBtn').fadeIn(2000);
        }, 2000)
      }, 4000);
    }, 4000);
  },

  actions: {
    startGame() {
      set(this, 'state.componentName', 'crime-scene');
      $('.startScreen').fadeOut(1500);
      $("#themeMusic").animate({volume: 0}, 1500);
      later(() => {
        set(this, 'gameStarted', true);
      }, 1500);
    },

    continueGame() {
      $('.startScreen').fadeOut(1500);
      $("#themeMusic").animate({volume: 0}, 1500);
      later(() => {
        get(this, 'state').loadGame();
        set(this, 'gameStarted', true);
      }, 1500);
    }
  },
});
