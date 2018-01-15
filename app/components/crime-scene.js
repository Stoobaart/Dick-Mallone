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

  syringePickedUp: Ember.computed('state.pickedupsyringe', function() {
    return get(this, 'state.pickedupsyringe');
  }),

  crimeSceneCompleted: observer('state.pickedupshards', 'state.pickedupfullcup', function() {
    if (get(this, 'state.pickedupshards') === true && get(this, 'state.pickedupfullcup') === true) {
      this.stationSceneUnlocked();
    }
  }),

  init() {
    this._super(...arguments);
    this.getProperties('state.pickedupshards', 'state.pickedupfullcup');
  },

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'crime-scene');
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
      this.sendAction('npcSpeach', "Dick I just had a call from Jen at the station, she says that crackhead is ready to talk now");
    }, 3000)
  }

});