import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  get,
  inject: {service},
  observer,
  run: {later},
  set
} = Ember;

export default Component.extend({

  state: service('state-handler'),

  paperUsedObserver: observer('state.blankpaperUsed', function() {
    this.crackheadGivenPaper();
  }),

  init() {
    this._super(...arguments);
    get(this, 'state.blankpaperUsed');
  },

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'interrogation-room-scene');
    $("#player").css({top: 441, left: 980.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    $("#player").fadeIn(500);
    $('#interrogationRoomMusic')[0].play();
    $('#stationDoor')[0].play();
  },

  willDestroyElement() {
    $('#interrogationRoomMusic')[0].pause();
  },

  crackheadGivenPaper() {
    later(() => {
      $(".player-speak").hide();
      this.sendAction('npcSpeach', "Okay, I'll try my best chief, come back in a little while");
    }, 5000)
  }

});
