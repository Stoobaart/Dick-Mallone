import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  set 
} = Ember;

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'analysis-room');
    $("#player").css({top: 441, left: 1180.5}).html('<img class="playerSprite" src="sprites/dickLeft.png">');
    $("#player").fadeIn(500);
    $('#analysisRoomMusic')[0].play();
    $('#stationDoor')[0].play();
    $('#policeStationSceneMusic')[0].pause();
  }
});
