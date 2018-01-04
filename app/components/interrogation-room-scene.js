import Component from '@ember/component';
import Ember from 'ember';

const { set } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'interrogation-room');
    const startY = ($("#exit").position().top) + 730;
    const startX = ($("#exit").position().left) - 50;
    
    $("#player").css({top: 441, left: 980.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');

    $("#player").fadeIn(500);
    $('#interrogationRoomMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#policeStationSceneMusic')[0].pause();
  },
});
