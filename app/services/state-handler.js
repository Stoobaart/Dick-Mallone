import Service from '@ember/service';

export default Service.extend({

	inventory: [
		{
			"name": "badge", 
			"url": "images/stationBadge.png"
		},
		{
			"name": "gun", 
			"url": "images/gun.png"
		}
	],

	actions: {
		// updateInventory() {
	 //    const items = get(this, 'inventory');
	 //    $(".items").html(items.map((item) => {
	 //      return('<img class="item" src="' + item.url + '" data-name="' + item.name + '">');
	 //    }).join(""));
	 //  },

	 //  findWithAttr(array, attr, value) {
	 //    for(var i = 0; i < array.length; i += 1) {
	 //        if(array[i][attr] === value) {
	 //          return set(this, 'itemToRemove', i);
	 //        }
	 //    }
	 //    return -1;
	 //  }
	}
});
