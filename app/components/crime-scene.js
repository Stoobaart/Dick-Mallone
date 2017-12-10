import Component from '@ember/component';
// import Ember from 'ember';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.set('scene', 'crimescene');
    $("#crimeSceneMusic")[0].play();
    $("#rainSoundFx")[0].play();
  }

});