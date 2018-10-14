import Component from '@ember/component';
import { later } from '@ember/runloop';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

  state: service('state-handler'),

  didInsertElement() {
    this._super(...arguments);
    $("#player, .footer-bar, .inventoryIcon").hide();
    $("#boat")[0].play();

    later(() => {
      set(this, 'state.componentName', 'station-scene');
    }, 4000);
  },

  willDestroyElement() {
    $("#boat")[0].pause();
    $(".footer-bar, .inventoryIcon").show();
  },
});
