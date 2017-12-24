import Component from '@ember/component';
import Ember from 'ember';

const { set, $ } = Ember;

export default Component.extend({
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
});