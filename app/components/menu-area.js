import { inject as service } from '@ember/service';
import $ from 'jquery';
import { set, get, computed } from '@ember/object';
import Component from '@ember/component';

// window.addEventListener("load", function() {
//   setTimeout(function() {
//     window.scrollTo(0, 1)
//   }, 0);
// });

export default Component.extend({

  state: service('state-handler'),

  isInCar: computed('scene', function() {
    return get(this, 'scene') === 'car-scene' ? true : false;
  }),

  actions: {
    changeVerb(e) {
      const verbChoice = e.target.dataset.verb;
      set(this, 'verb', verbChoice);
    },

    toggleInventory() {
      if ($(".inventory").is(":visible")) {
        $(".inventory").slideUp(300);
      } else {
        $(".inventory").slideDown(300);
        set(this, 'verb', '');
      }
    },

    inventoryItemClicked(itemForUse, e) {
      const verb = get(this, 'verb');
      const squashedTargetId = e.target.id.replace(/\s/g, '');
      let desire = null;
      let line = null;
      if (verb === 'Look at') {
        desire = `itemsInInventory.${squashedTargetId}.Look`;
        line = get(this, 'scripts').get(desire);
        set(this, 'verb', '');
      } else {
        $(".inventory").slideUp(300);
        const itemString = e.target.id.replace(/-/g, ' ');
        const useVerb = `Use ${itemString} on`;
        set(this, 'verb', useVerb);
        set(this, 'state.itemForUse', itemForUse);
        return;
      }

      if (line) {
        this.playerSpeach(line);
      }
    },

    saveGame() {
      const scene = get(this, 'scene');
      get(this, 'state').saveGame(scene);
    },

    loadGame() {
      get(this, 'state').loadGame();
    }

  }

});
