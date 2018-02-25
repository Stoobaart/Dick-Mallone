import Component from '@ember/component';
import $ from 'jquery';
import { set } from '@ember/object';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);
    $('#player').stop();
    set(this, 'scene', 'teds-trinkets-scene');
    $("#player").css({top: 441, left: 108}).html('<img class="playerSprite" src="sprites/dickRight.png">');
    $("#player").fadeIn(500);
    // $('#')[0].play();
  },
});
