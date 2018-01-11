import Component from '@ember/component';
import Ember from 'ember';

const { 
  get,
  inject: {service},
  observer,
  run: {later},
  set, 
  $ 
} = Ember;

export default Component.extend({

  state: service('state-handler'),

  crimeSceneCompleted: observer('state.pickedupshards', 'state.pickedupcupFull', function() {
    if (get(this, 'state.pickedupshards') === true && get(this, 'state.pickedupcupFull') === true) {
      this.stationSceneUnlocked();
    }
  }),

  init() {
    this._super(...arguments);
    this.getProperties('state.pickedupshards', 'state.pickedupcupFull');
  },

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'crime');
    const startX = ($("#car").position().left) + 137.5;
    const startY = ($("#car").position().top) + 657.1;
    $("#player").css({ top: startY, left: startX}).html('<img class="playerSprite" src="sprites/dick.png">');
    $("#carDoor")[0].play();

    $("#player, #npcRodriguez").fadeIn(500);
    $(".scene-one, .rain-container").fadeIn(1000);
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  },

  stationSceneUnlocked() {
    later(() => {
      $('.walkable-area, .thing, .footer-bar').hide();
      this.sendAction('npcSpeach', "Dick I just had a call from Jen at the station, she says that crackhead is ready to talk now");
      later(() => {
        $('.walkable-area, .thing, .footer-bar').show();
      }, 3000)
    }, 3000)
  }

});