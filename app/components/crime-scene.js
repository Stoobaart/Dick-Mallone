import Component from '@ember/component';
// import Ember from 'ember';

export default Component.extend({
	didInsertElement() {
    this._super(...arguments);
    $("#carDoor")[0].play();
    $(".scene-one, #player, .rain-container").fadeIn(2000);
    $("#crimeSceneMusic")[0].play();
  },

  init() {
    this._super(...arguments);
    // this.set('scene', 'crimescene');
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  }

});