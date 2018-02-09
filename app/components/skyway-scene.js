import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  state: service('state-handler'),

   didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'skyway-scene');
    if (get(this, 'state.previousScene') === 'car-scene') {
      $("#player").css({top: 441, left: 108}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    }
    $(".skyway-entrance-scene, .rain-container-skyway").fadeIn(1000);
    $("#player").fadeIn(500);
    $('#skywaySceneMusic')[0].play();
  },

  willDestroyElement() {
    $('#skywaySceneMusic')[0].pause();
  },

});
