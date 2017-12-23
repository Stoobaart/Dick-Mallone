import Component from '@ember/component';
// import Ember from 'ember';

export default Component.extend({
	didInsertElement() {
    this._super(...arguments);
    const startX = ($("#car").position().left) + 137.5;
    const startY = ($("#car").position().top) + 657.1;
    $("#player").css({ top: startY, left: startX}).html('<img class="playerSprite" src="sprites/dick.png">');
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