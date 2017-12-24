import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  get,
  run: {
    later,
  }, 
  set
} = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

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
      }
    },

    inventoryItemClicked(itemForUse, e) {
      const verb = get(this, 'verb');
      const use = get(this, 'verb').indexOf("Use") != -1 ? true : false;
      const squashedTargetId = e.target.id.replace(/\s/g, '');
      let desire = null;
      let line = null;
      if (verb === 'Look at') {
        desire = `itemsInInventory.${squashedTargetId}.Look`;
        line = get(this, 'scripts').get(desire);
      } else if (use === true) {
        const usedOn = get(this, 'verb').replace(/\s/g, '');
        desire = `itemsInInventory.${squashedTargetId}.${usedOn}`;
        line = get(this, 'scripts').get(desire);
      } else {
        const useVerb = `Use ${e.target.id} on`;
        set(this, 'verb', useVerb);
        set(this, 'state.itemForUse', itemForUse);
        return;
      }

      if (line) {
        $('.action-choice-btns, .walkable-area, .thing, .helper').hide();
        this.sendAction('playerSpeach', line);
        later(() => {
          $('.action-choice-btns, .walkable-area, .thing, .helper').toggle();
        }, line.length * 50);
      }
    },

  }

});
