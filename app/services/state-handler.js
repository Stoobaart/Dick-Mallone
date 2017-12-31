import Service from '@ember/service';
import Ember from 'ember';

const {
	get,
	set,
  $,
} = Ember

export default Service.extend({

  hasSave: false,
  previousScene: 'crime',
	pickedupshards: false,
	pickedupcup: false,
  pickedupcupFull: false,
  travelMapOpened: false,

  itemForUse: null,

	inventory: [
		{
			"name": "badge", 
			"url": "images/stationBadge.png",
			"id": "badge"
		},
		{
			"name": "gun", 
			"url": "images/gun.png",
			"id": "gun",
      "use": "enemy"
		}
	],

  itemsThatReplaceOthers: [
    {
      "name": "cupFull",
      "url": "images/cupFull.png",
      "id": "full cup",
      "use": ["crackHead", "jenkins"],
      "replaces": "cup"
    }
  ],

  componentName: Ember.computed(function() {
    if(localStorage.hasSave) {
      return localStorage.scene;
    } else {
      return 'crime';
    }
  }),

	add(item) {
		const collected = "pickedup" + item.name;
		if (!(get(this, collected))) {
			get(this, 'inventory').pushObject(item);
			set(this, collected, true);
		}
		
  },

  remove(targetId) {
    const itemForUse = get(this, 'itemForUse');
    if (itemForUse.use === targetId) {
      get(this, 'inventory').removeObject(itemForUse);
      this.replace(itemForUse.id);
      set(this, 'itemForUse', null);
    }
  },

  replace(itemUsedId) {
    const itemsThatReplaceOthers = get(this, 'itemsThatReplaceOthers');
    itemsThatReplaceOthers.forEach((itemThatReplacesAnother) => {
      if (itemThatReplacesAnother.replaces === itemUsedId) {
        this.add(itemThatReplacesAnother);
      }
    });
  },

  saveGame(scene) {
    set(this, 'hasSave', true);
    localStorage.hasSave = JSON.stringify(get(this, 'hasSave'));
    localStorage.inventory = JSON.stringify(get(this, 'inventory'));
    localStorage.scene = scene;
    localStorage.previousScene = get(this, 'previousScene');
    localStorage.cupPickedUp = JSON.stringify(get(this, 'pickedupcup'));
    localStorage.shardCollected = JSON.stringify(get(this, 'pickedupshards'));
    localStorage.weeCollected = JSON.stringify(get(this, 'pickedupcupFull'));
    // localStorage.paperCollected = JSON.stringify(paperCollected);
    // localStorage.jenkinsIntro = JSON.stringify(jenkinsIntro);
    // localStorage.interrogationDone = JSON.stringify(interrogationDone);
    alert("Progress saved");
  },

  loadGame() {
    $('#crimeSceneMusic')[0].pause();
    // $('#policeStationSceneMusic')[0].pause();
    $('#themeMusic')[0].pause();
    // $("#analysisRoomMusic")[0].pause();

    this.setProperties({
      'hasSave': JSON.parse(localStorage.hasSave),
      'inventory': JSON.parse(localStorage.inventory),
      'scene': localStorage.scene,
      'previousScene': localStorage.previousScene,
      'pickedupcup': JSON.parse(localStorage.cupPickedUp),
      'pickedupshards': JSON.parse(localStorage.shardCollected),
      'pickedupcupFull': JSON.parse(localStorage.weeCollected),
    })
    // paperCollected = JSON.parse(localStorage.paperCollected);
    // jenkinsIntro = JSON.parse(localStorage.jenkinsIntro);
    // exit = JSON.parse(localStorage.exit);
    // interrogationDone = JSON.parse(localStorage.interrogationDone);
    
    set(this, 'componentName', get(this, 'scene'));
  }

});
