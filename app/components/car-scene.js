import Component from '@ember/component';
import Ember from 'ember';

const { $ } = Ember;

export default Component.extend({
	didInsertElement() {
    this._super(...arguments);
    $("#carDoor")[0].play();
    $(".dick-mobile-interior, .exit-car").fadeIn(2000);
  },


});
