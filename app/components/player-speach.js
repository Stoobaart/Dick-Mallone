import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

  // player speach function
  playerSpeach(line) {
    Ember.$(".player-speak").toggle();
    Ember.$(".player-speach").html(line);
    this.sendAction('speakClear', line);
  },

  // npcSpeach(words) {
  //   Ember.$(".npcSpeach").html(words);
  //   Ember.$(".npcPortrait, .npcSpeach").toggle();
  //   npcSpeakClear();
  // },

  // clear speach after a few seconds
  speakClear(line) {
    const words = line;
    Ember.run.later(() => {
      Ember.$(".player-speak").toggle();
    }, words.length * 60);
  },

});
