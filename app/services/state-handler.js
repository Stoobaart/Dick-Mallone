import Service from '@ember/service';

const {
	get,
	set,
} = Ember

export default Service.extend({

	pickedupshards: false,
	pickedupcup: false,

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

  }

});
