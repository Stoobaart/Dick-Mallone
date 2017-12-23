import Component from '@ember/component';
import Ember from 'ember';

const { $ } = Ember;

export default Component.extend({
	didInsertElement() {
    this._super(...arguments);
    $("#carDoor")[0].play();
    $(".car-foreground").fadeIn(750);
    $(".rain-container, .car-background, .exit-car").fadeIn(2000);
  },

});