import Component from '@ember/component';
import Ember from 'ember';

const {
  $,
  get, 
  set
} = Ember;

export default Component.extend({

  state: Ember.inject.service('state-handler'),

  actions: {
    changeVerb(e) {
      const verbChoice = e.target.dataset.verb;
      set(this, 'verb', verbChoice);
      if (get(this, 'verb') === 'Look') {
        $(".player-action").html("Look at");
      } else if (get(this, 'verb') === 'Pick') {
        $(".player-action").html("Pick up");
      } else if (get(this, 'verb') === 'Talk') {
        $(".player-action").html("Talk to");
      }
    },

    toggleInventory() {
      if ($(".inventory").is(":visible")) {
        $(".inventory").slideUp(300);
      } else {
      $(".inventory").slideDown(300);
      }
    }
  }

});
