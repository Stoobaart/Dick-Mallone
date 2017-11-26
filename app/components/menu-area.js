import Component from '@ember/component';
import Ember from 'ember';

const {
  get, set
} = Ember;

export default Component.extend({

  actions: {
    changeVerb(e) {
      const verbChoice = e.target.dataset.verb;
      set(this, 'verb', verbChoice);

      // shrink this down Stu!
      if (get(this, 'verb') === 'Look') {
        Ember.$(".player-action").html("Look at");
      } else if (get(this, 'verb') === 'Pick') {
        Ember.$(".player-action").html("Pick up");
      } else if (get(this, 'verb') === 'Talk') {
        Ember.$(".player-action").html("Talk to");
      }
    }
  }

});
