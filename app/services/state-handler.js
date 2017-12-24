import Service from '@ember/service';
import Ember from 'ember';

const {
	get,
	set,
} = Ember

export default Service.extend({

  componentName: 'crime',
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
    // $(".startScreen, .sceneOneScreen, .menuArea, .inventory, .inventoryIcon, #player").hide();
    $('#crimeSceneMusic')[0].pause();
    // $('#policeStationSceneMusic')[0].pause();
    $('#themeMusic')[0].pause();
    // $("#analysisRoomMusic")[0].pause();

    this.setProperties({
      'inventory': JSON.parse(localStorage.inventory),
      'scene': localStorage.scene,
      'previousScene': localStorage.previousScene,
      'pickedupcup': JSON.parse(localStorage.cupPickedUp),
      'pickedupshards': JSON.parse(localStorage.shardCollected),
      'pickedupcupFull': JSON.parse(localStorage.weeCollected),
    })
    // items = JSON.parse(localStorage.items);
    // currentScene = localStorage.currentScene;
    // cupPickedUp = JSON.parse(localStorage.cupPickedUp);
    // paperCollected = JSON.parse(localStorage.paperCollected);
    // shardCollected = JSON.parse(localStorage.shardCollected);
    // weeCollected = JSON.parse(localStorage.weeCollected);
    // aboutBlood = JSON.parse(localStorage.aboutBlood);
    // aboutVicDeath = JSON.parse(localStorage.aboutVicDeath);
    // jenkinsIntro = JSON.parse(localStorage.jenkinsIntro);
    // exit = JSON.parse(localStorage.exit);
    // interrogationDone = JSON.parse(localStorage.interrogationDone);
    
    set(this, 'componentName', get(this, 'scene'));

    // setTimeout(() => {
    //   if (currentScene === "crimeScene") {
    //     startCrimeScene();
    //   } else if (currentScene === "policeStationScene") {
    //     startPoliceStation();
    //     let startX = ($(".stationDoor").position().left) + 50;
    //     let startY = ($(".stationDoor").position().top) + 150;
    //     $("#player").stop().css({ top: startY, left: startX}).html('<img class="playerSprite" src="assets/images/TheDetective.png">');
    //     $("#player").fadeIn(700);
    //   } else if (currentScene === "policeStationInteriorScene") {
    //     $("#policeStationSceneMusic")[0].play();
    //     startPoliceStationInterior();
    //   } else if (currentScene === "analysisRoomScene") {
    //     startAnalysisRoom();
    //   } else if (currentScene === "interrogationRoomScene") {
    //     startInterrogationRoom();
    //   }
    //   updateInventory()
    // }, 1100)
  }

});
