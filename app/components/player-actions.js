import { inject as service } from '@ember/service';
import $ from 'jquery';
import { set, get } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  state: service('state-handler'),

  verb: 'Walk to',

  helperText: null,

  walk(e) {
    set(this, 'verb', 'Walk to');
    if ($(".inventory").is(":visible")) {
      $(".inventory").slideUp(300);
    }
    // When the player clicks somewhere on the screen (walkable area)
    // player can walk in front or behind
    if($(".npc").length > 0) {
      const npcPos = $(".npc").position().top;
      const dickPos = event.pageY - 200;
      if(dickPos <= npcPos){
        $("#npcRodriguez").addClass("in-front");
      } else {
        $("#npcRodriguez").removeClass("in-front");
      }
    }

    // store the current position of the player Sprite
    const playerPositionX = $("#player").position().left
    const playerPositionY = $("#player").position().top

    // get the difference of where the player has clicked, minus where the sprite is
    const playerPositionXDiff = event.pageX - playerPositionX;
    const playerPositionYDiff = event.pageY - playerPositionY;

    const timeToWalk = (Math.abs(playerPositionXDiff) + Math.abs(playerPositionYDiff)) * 5;
    // if the sprite is being told to move right of it's original position...
    if (get(this, 'verb') === "Walk to") {
      if((playerPositionXDiff > 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dickRight.png">');
      } else if ((playerPositionYDiff > 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dick.png">');
      } else if ((playerPositionYDiff < 0 ) && ((Math.abs(playerPositionXDiff)) < (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dickUp.png">');
      } else if ((playerPositionXDiff < 0) && ((Math.abs(playerPositionXDiff)) > (Math.abs(playerPositionYDiff)))) {
        $("#player").html('<img class="playerSprite" src="sprites/dickLeft.png">');
      }
      $(".playerSprite").addClass("walk");
      // this check is for Dick's auto walk when interacting with something. makes him stop before the object.
      let eventPageY = null;
      let eventPageX = null;
      const walkableAreaLeftEdge = $('.walkable-area').position().left;
      const walkableAreaRightEdge = $('.walkable-area').position().left + $('.walkable-area').width();
      const walkableAreaTopEdge = $('.walkable-area').position().top;
      if(e) {
        if(e.pageY < walkableAreaTopEdge) {
          eventPageY = walkableAreaTopEdge + 25;
        } else {
          eventPageY = e.pageY + 50;
        }
        if(e.pageX > playerPositionX) {
          eventPageX = e.pageX - 50;
        } else {
          eventPageX = e.pageX + 50;
        }
        if (e.pageX < walkableAreaLeftEdge) {
          eventPageX = walkableAreaLeftEdge + 50;
        } else if (e.pageX > walkableAreaRightEdge) {
          eventPageX = walkableAreaRightEdge - 50;
        }
      } else {
        eventPageY = event.pageY;
        eventPageX = event.pageX;
      }
      // run the animation (.stop is there to allow you to change direction before the end of each animation)
      $('#player').stop().animate({
        top: eventPageY,
        left: eventPageX
      }, timeToWalk, function () {
        // when the sprite reaches the clicked location, stop the animation
        $(".playerSprite").removeClass("walk");
      });
    }
  },

  thingClicked(e) {
    if (e.target.id === 'exit') {
      set(this, 'verb', 'Walk to');
      set(this, 'state.componentName', get(this, 'state.previousScene'));
    }
    const verb = get(this, 'verb');
    const scene = get(this, 'scene');
    const use = get(this, 'verb').indexOf("Use") != -1 ? true : false;
    if (verb === 'Look at') {
      this.lookAt(e.target.id, scene);
    } else if (verb === 'Pick up') {
      this.lookAt(e.target.id, scene, 'Pick');
      const pickupable = e.target.getAttribute('pickupable');
      if (pickupable === "true") {
        get(this, 'state').add(e.target.getAttribute('data-name'));
        set(this, 'verb', 'Walk to');
        this.clearHelper();
      }
    } else if (verb === 'Talk to') {
      const thingType = e.target.getAttribute('data-type');
      this.talkTo(e.target.id, scene, thingType);
    } else if (use === true) {
      const usedOn = get(this, 'verb').replace(/\s/g, '');
      this.lookAt(e.target.id, scene, usedOn);
      this.useOn(e.target.id, scene, usedOn);
    } else if (verb === 'Walk to') {
      this.changeScene(e.target.id, scene);
    }
    if(scene !== 'car-scene') {
      this.walk(e);
    }

  },

  lookAt(targetId, scene, usedOn) {
    if (targetId === 'map' && !usedOn) {
      return this.toggleProperty('state.travelMapOpened');
    }
    const squashedTargetId = targetId.replace(/\s/g, '');
    let desire;
    if (usedOn) {
      return this.sendAction('convo', scene, targetId, false, usedOn, true);
    } else {
      desire = `${scene}.${squashedTargetId}.Look`;
      const line = get(this, 'scripts').get(desire);
      if (line) {
        return this.sendAction('playerSpeach', line);
      }
    }
  },

  useOn(targetId) {
    if ($(".inventory").is(":visible")) {
      $(".inventory").slideUp(300);
    }
    get(this, 'state').remove(targetId);
    set(this, 'verb', 'Walk to');
    this.clearHelper();
  },

  talkTo(targetId, scene, thingType) {
    const desire = `${scene}.${targetId}.Talk`;
    const line = get(this, 'scripts').get(desire);
    if(thingType === "person") {
      this.sendAction('convo', scene, targetId);
    } else {
      if (line) {
        this.sendAction('playerSpeach', line);
      }
    }
  },

  changeScene(targetLocale, scene) {
    if (targetLocale === 'map') {
      return this.toggleProperty('state.travelMapOpened');
    }
    const scenes = ['exit', 'crime', 'car', 'station', 'interrogation-room', 'analysis-room', 'skyway', 'skyway-market', 'teds-trinkets'];
    let sceneName = null;
    scenes.forEach((area) => {
      if (area === targetLocale) {
        if (targetLocale === 'exit') {
          sceneName = get(this, 'state.previousScene');
        } else {
          sceneName = `${targetLocale}-scene`;
        }
      } else {
        return;
      }
      set(this, 'scene', scene);
      set(this, 'state.previousScene', scene);
      set(this, 'componentName', sceneName);
      $("#player").hide();
    });
  },

  helper(e) {
    const helperText = e.target.id.replace(/-/g, ' ');
    set(this, 'helperText', helperText);
  },

  clearHelper() {
    set(this, 'helperText', null);
  }

});
