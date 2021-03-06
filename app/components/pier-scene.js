import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import { get, set } from '@ember/object';

export default Component.extend({
  state: service('state-handler'),

  fullcupUsed: alias('state.fullcupUsed'),

  didInsertElement() {
    this._super(...arguments);
    set(this, 'scene', 'pier-scene');
    debugger;

    if (get(this, 'state.previousScene') === 'rig-entrance-scene') {
      $("#player")
      .stop()
      .css({top: 391, left: 800})
      .html('<img class="playerSprite" src="sprites/dick.png">')
      .fadeIn(500);
    } else {
      $("#player")
      .stop()
      .css({top: 391, left: 200})
      .html('<img class="playerSprite" src="sprites/dickRight.png">')
      .fadeIn(500);
    }
    $('#waves')[0].play();
    $('#rainSoundFx')[0].play();
  },

  actions: {
    cutscene() {
      set(this, 'state.componentName', 'boat-scene');
      set(this, 'state.previousScene', 'boat-scene');
    }
  },
});
