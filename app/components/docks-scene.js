import Component from '@ember/component';
import $ from 'jquery';
import { set } from '@ember/object';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'docks-scene');
    $("#player").css({top: 391, left: 100}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    $("#player").fadeIn(500);
    $('#waves')[0].play();
    $('#rainSoundFx')[0].play();
  },

});
