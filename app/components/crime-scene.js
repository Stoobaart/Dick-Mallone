import Component from '@ember/component';
// import Ember from 'ember';

export default Component.extend({
	didInsertElement() {
    this._super(...arguments);
    $("#carDoor")[0].play();
    $(".scene-one, #player, .rain-container, #npcRodriguez").fadeIn(1000);
    $("#crimeSceneMusic")[0].play();
  },

  init() {
    this._super(...arguments);
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  }

});