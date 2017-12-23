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
      // if (get(this, 'verb') === 'Look') {
      //   $(".player-action").html("Look at");
      // } else if (get(this, 'verb') === 'Pick') {
      //   $(".player-action").html("Pick up");
      // } else if (get(this, 'verb') === 'Talk') {
      //   $(".player-action").html("Talk to");
      // }
    },

    toggleInventory() {
      if ($(".inventory").is(":visible")) {
        $(".inventory").slideUp(300);
      } else {
      $(".inventory").slideDown(300);
      }
    },

    inventoryItemClicked(e) {
      const verb = get(this, 'verb');
      if (verb === 'Look at') {
        const desire = 'itemsInInventory.' + e.target.id + '.Look';
        const line = get(this, 'scripts').get(desire);
        $('.action-choice-btns, .walkable-area, .thing, .helper').hide();
        this.sendAction('playerSpeach', line);
        later(() => {
          $('.action-choice-btns, .walkable-area, .thing, .helper').toggle();
        }, line.length * 50);
      } else {
        // const desire = 'itemsInInventory.' + e.target.id + '.Use';
        const useVerb = "Use " + e.target.id + " on"
        set(this, 'verb', useVerb);
        
      }
    },

  }

});
