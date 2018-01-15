import Service from '@ember/service';
import Ember from 'ember';

const {
	get,
	set,
  run: {
    later,
  },
  $,
} = Ember

export default Service.extend({

  componentName: null,
  scene: 'crime-scene',
  previousScene: 'crime',
  pickedupshards: false,
	pickedupsyringe: false,
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
      "name": "syringe",
      "url": "images/syringe.png",
      "id": "syringe",
      "use": "",
      "replaces": ""
    },
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
    const saveGame = {
      'inventory': get(this, 'inventory'),
      'scene': scene,
      'previousScene': get(this, 'previousScene'),
      'cupPickedUp': get(this, 'pickedupcup'),
      'shardCollected': get(this, 'pickedupshards'),
      'syringeCollected': get(this, 'pickedupsyringe'),
      'weeCollected': get(this, 'pickedupfullcup'),
      'paperCollected': get(this, 'pickeduppaper'),
      'paperUsed': get(this, 'paperUsed'),
      'analysisUnlocked': get(this, 'analysisUnlocked')
    }
    localStorage.saveGame = JSON.stringify(saveGame);

    // localStorage.jenkinsIntro = JSON.stringify(jenkinsIntro);
    // localStorage.interrogationDone = JSON.stringify(interrogationDone);
    alert("Progress saved");
  },

  loadGame() {
    $('.game-container').hide();
    set(this, 'componentName', null);
    // $('#crimeSceneMusic')[0].pause();
    // $('#policeStationSceneMusic')[0].pause();
    // $('#themeMusic')[0].pause();
    // $("#analysisRoomMusic")[0].pause();
    const saveGame = JSON.parse(localStorage.saveGame);
    this.setProperties({
      'inventory': saveGame.inventory,
      'scene': saveGame.scene,
      'previousScene': saveGame.previousScene,
      'pickedupcup': saveGame.cupPickedUp,
      'pickedupshards': saveGame.shardCollected,
      'pickedupsyringe': saveGame.syringeCollected,
      'pickedupfullcup': saveGame.weeCollected,
      'pickeduppaper': saveGame.paperCollected,
      'paperUsed': saveGame.paperUsed,
      'analysisUnlocked': saveGame.analysisUnlocked,
    })
    // jenkinsIntro = JSON.parse(localStorage.jenkinsIntro);
    // exit = JSON.parse(localStorage.exit);
    // interrogationDone = JSON.parse(localStorage.interrogationDone);
    set(this, 'componentName', get(this, 'scene'));
    later(() => {
      $('.game-container').show();
    }, 1000)

  }

});
