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

  crimeSceneCompleted: observer('state.pickedupshards', 'state.pickedupfullcup', 'state.pickedupsyringe', function() {
    if (get(this, 'state.pickedupshards') && get(this, 'state.pickedupfullcup') && get(this, 'state.pickedupsyringe')) {
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
    $("#player").css({top: 295, left: 250}).html('<img class="playerSprite" src="sprites/dick.png">');

    $("#player, #npcRodriguez").fadeIn(500);
    $(".scene-one, .rain-container").fadeIn(1000);

    $("#carDoor")[0].play();
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  },

  willDestroyElement() {
    $("#crimeSceneMusic")[0].pause();
  },

  stationSceneUnlocked() {
    if(!(get(this, 'state.stationUnlocked'))) {
      set(this, 'state.stationUnlocked', true);
      later(() => {
        $(".player-speak").hide();
        this.sendAction('npcSpeach', "Dick I just had a call from Jen at the station, she says that crackhead is ready to talk now");
      }, 5000);
    } else {
      return;
    }
  }

});