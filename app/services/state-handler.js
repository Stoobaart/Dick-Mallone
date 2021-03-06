import { A } from '@ember/array';
import { set, get } from '@ember/object';
import { later } from '@ember/runloop';
import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({

  componentName: null,
  scene: 'crime-scene',
  previousScene: 'crime',

  // events
  pickedupshards: false,
	pickedupsyringe: false,
	pickedupcup: false,
  pickedupfullcup: false,
  pickedupblankpaper: false,
  pickedupportrait: false,
  blankpaperUsed: false,
  travelMapOpened: false,
  jenkinsVanished: false,
  portraitUsed: false,
  usebadgeoncook: false,
  fullcupUsed: false,
  usegunongate: false,
  gateOpened: false,
  rigDoorOpened: false,

  // conversation topics covered
  bizarreCovered: false,
  bloodCovered: false,
  anythingelseCovered: false,
  whereIsJenkinsCovered: false,
  errandsLocationCovered: false,
  pressureCovered: false,

  // locations unlocked
  stationUnlocked: false,
  analysisUnlocked: false,
  docksFound: false,

  itemForUse: null,

	inventory: A([
		{
			"name": "badge",
			"url": "images/stationBadge.png",
			"id": "badge"
		},
		{
			"name": "gun",
			"url": "images/gun.png",
			"id": "gun",
		}
	]),

  worldItems: A([
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
      "use": "boat",
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
      "id": "blank-paper",
      "use": "crackhead",
      "replaces": ""
    },
    {
      "name": "portrait",
      "url": "images/portrait.png",
      "id": "portrait",
      "use": "ted",
      "replaces": ""
    }
  ]),

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
      const itemUsedString = itemForUse.id.replace(/-/g, '');
      const usedItem = itemUsedString + 'Used';
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
      'paperCollected': get(this, 'pickedupblankpaper'),
      'pickedupportrait': get(this, 'pickedupportrait'),
      'blankpaperUsed': get(this, 'blankpaperUsed'),
      'analysisUnlocked': get(this, 'analysisUnlocked'),
      'stationUnlocked': get(this, 'stationUnlocked'),
      'bizarreCovered': get(this, 'bizarreCovered'),
      'bloodCovered': get(this, 'bloodCovered'),
      'anythingelseCovered': get(this, 'anythingelseCovered'),
      'jenkinsVanished': get(this, 'jenkinsVanished'),
      'whereIsJenkinsCovered': get(this, 'whereIsJenkinsCovered'),
      'errandsLocationCovered': get(this, 'errandsLocationCovered'),
      'usebadgeoncook': get(this, 'usebadgeoncook'),
      'pressureCovered': get(this, 'pressureCovered'),
      'usebadgeonted': get(this, 'usebadgeonted'),
      'portraitUsed': get(this, 'portraitUsed'),
      'docksFound': get(this, 'docksFound'),
      'usegunongate': get(this, 'usegunongate'),
      'gateOpened': get(this, 'gateOpened'),
      'fullcupUsed': get(this, 'fullcupUsed'),
      'rigDoorOpened': get(this, 'rigDoorOpened'),
    }
    localStorage.saveGame = JSON.stringify(saveGame);

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
      'pickedupblankpaper': saveGame.paperCollected,
      'pickedupportrait': saveGame.pickedupportrait,
      'blankpaperUsed': saveGame.blankpaperUsed,
      'analysisUnlocked': saveGame.analysisUnlocked,
      'stationUnlocked': saveGame.stationUnlocked,
      'bizarreCovered': saveGame.bizarreCovered,
      'bloodCovered': saveGame.bloodCovered,
      'anythingelseCovered': saveGame.anythingelseCovered,
      'jenkinsVanished': saveGame.jenkinsVanished,
      'whereIsJenkinsCovered': saveGame.whereIsJenkinsCovered,
      'errandsLocationCovered': saveGame.errandsLocationCovered,
      'usebadgeoncook': saveGame.usebadgeoncook,
      'pressureCovered': saveGame.pressureCovered,
      'usebadgeonted': saveGame.usebadgeonted,
      'portraitUsed': saveGame.portraitUsed,
      'docksFound': saveGame.docksFound,
      'usegunongate': saveGame.usegunongate,
      'gateOpened': saveGame.gateOpened,
      'fullcupUsed': saveGame.fullcupUsed,
      'rigDoorOpened': saveGame.rigDoorOpened,
    })

    set(this, 'componentName', get(this, 'scene'));
    later(() => {
      $('.game-container').show();
    }, 1000)

  }

});
