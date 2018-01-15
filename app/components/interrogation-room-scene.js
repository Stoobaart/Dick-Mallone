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

  paperUsedObserver: observer('state.paperUsed', function() {
    this.crackheadGivenPaper();
  }),

  init() {
    this._super(...arguments);
    get(this, 'state.paperUsed');
  },

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'interrogation-room-scene');
    $("#player").css({top: 441, left: 980.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    $("#player").fadeIn(500);
    $('#interrogationRoomMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#policeStationSceneMusic')[0].pause();
    $('#analysisRoomMusic')[0].pause();
  },

  crackheadGivenPaper() {
    later(() => {
      this.sendAction('npcSpeach', "Okay, I'll try my best chief, come back in a little while");
    }, 2500)
  }

});
