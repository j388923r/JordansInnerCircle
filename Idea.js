/**
* Idea represents a sticky note on the board. This means
* that this Idea object can belong under the 'Ideas' section 
* or under the 'Decisions' section.
* The three main important things when making an Idea is the title,
* category, and cost.
*/

var Idea = function(title, category, cost){

	this.title = title;
	this.category = category;
	this.cost = cost;
	this.description = "";
	this.pictures = [];
	this.tags = [];

	// Public Functions

	/**
	* Adds a link of a picture to an Idea. Right now it only supports links.
	*/
	this.addPicture = function(picture){
		this.pictures.push(picture);
	}

	/**
	* Removes a link of a picture to an Idea. Right now it only supports links.
	*/
	this.removePicture = function(picture){
		var pictures = getPictures();
		var picIndex = pictures.indexOf(picture);
		if (picIndex != -1){
			this.pictures.splice(picIndex,1);
		}
	}

	this.updateDescription = function(description){
		this.description = description;
	}

	this.updateTags = function(tags){
		this.tags = tags;
	}


	this.updateCost = function(cost){
		this.cost = cost;
	}

	this.updateTitle = function(title){
		this.title = title;
	}

	this.updateCategory = function(category){
		this.category = category;
	}

	this.getTitle(){
		return this.title;
	}

	this.getCategory(){
		return this.category;
	}

	this.getCost(){
		return this.cost;
	}

	this.getDescription(){
		return this.description;
	}
	
	this.getPictures(){
		return this.pictures;
	}

	this.getTags(){
		return this.tags;
	}

}
