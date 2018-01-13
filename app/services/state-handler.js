import Service from '@ember/service';
import Ember from 'ember';

const {
	get,
	set,
  $,
} = Ember

export default Service.extend({

  hasSave: false,
  componentName: null,
  scene: 'crime',
  previousScene: 'crime',
	pickedupshards: false,
	pickedupcup: false,
  pickedupfullcup: false,
  pickeduppaper: false,
  paperUsed: false,
  analysisUnlocked: false,
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

  worldItems: [
    {
      "name": "cup",
      "url": "images/cup.png",
      "id": "cup",
      "use": "urine",
      "replaces": ""
    },
    {
      "name": "full-cup",
      "url": "images/cupFull.png",
      "id": "full-cup",
      "use": ["crackHead", "jenkins"],
      "replaces": "cup"
    },
    {
      "name": "shards",
      "url": "images/shards.png",
      "id": "shards",
      "use": "",
      "replaces": ""
    },
    {
      "name": "paper",
      "url": "images/paper.png",
      "id": "paper",
      "use": "crackhead",
      "replaces": ""
    }
  ],

	add(targetId) {
    const itemString = targetId.replace(/-/g, '');
		const collected = "pickedup" + itemString;
		if (!(get(this, collected))) {
      const worldItems = get(this, 'worldItems');
      worldItems.forEach((item) => {
        if (item.id === targetId) {
          get(this, 'inventory').pushObject(item);
          set(this, collected, true);
        }
      });
		}
  },

  remove(targetId) {
    const itemForUse = get(this, 'itemForUse');
    if (itemForUse.use === targetId) {
      const usedItem = itemForUse.id + 'Used';
      set(this, usedItem, true);
      get(this, 'inventory').removeObject(itemForUse);
      this.replace(itemForUse.id);
      set(this, 'itemForUse', null);
    }
  },

  replace(itemUsedId) {
    const worldItems = get(this, 'worldItems');
    worldItems.forEach((itemThatReplacesAnother) => {
      if (itemThatReplacesAnother.replaces === itemUsedId) {
        this.add(itemThatReplacesAnother.id);
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
    localStorage.weeCollected = JSON.stringify(get(this, 'pickedupfullcup'));
    localStorage.paperCollected = JSON.stringify(get(this, 'pickeduppaper'));
    localStorage.paperUsed = JSON.stringify(get(this, 'paperUsed'));
    localStorage.analysisUnlocked = JSON.stringify(get(this, 'analysisUnlocked'));
    // localStorage.jenkinsIntro = JSON.stringify(jenkinsIntro);
    // localStorage.interrogationDone = JSON.stringify(interrogationDone);
    alert("Progress saved");
  },

  loadGame() {
    $('.game-container, #player').hide();
    set(this, 'componentName', null);

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
      'pickedupfullcup': JSON.parse(localStorage.weeCollected),
      'pickeduppaper': JSON.parse(localStorage.paperCollected),
      'paperUsed': JSON.parse(localStorage.paperUsed),
      'analysisUnlocked': JSON.parse(localStorage.analysisUnlocked),
    })
    // jenkinsIntro = JSON.parse(localStorage.jenkinsIntro);
    // exit = JSON.parse(localStorage.exit);
    // interrogationDone = JSON.parse(localStorage.interrogationDone);
    
    set(this, 'componentName', get(this, 'scene'));
  }

});
