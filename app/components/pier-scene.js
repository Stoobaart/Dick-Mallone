import Component from '@ember/component';
import $ from 'jquery';
import { set } from '@ember/object';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'pier-scene');
    $("#player")
      .stop()
      .css({top: 391, left: 100})
      .html('<img class="playerSprite" src="sprites/dickRight.png">')
      .fadeIn(500);
  },
});
