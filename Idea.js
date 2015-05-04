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
	this.hidden = false;
	this.deleted = false;
	this.decided= false;
	this.ideaDiv = undefined;

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

	/*
	* Set the idea as Decided when the user drags the idea from the Ideas section to the Decided section.
	*/
	this.setDecided = function(){
		this.decided = true;
	}

	/*
	* Sets the status of the idea to be hidden from the user.
	*/
	this.hide = function(){
		this.hidden = true;
		this.ideaDiv.hide();
	}

	/*
	* Sets the idea to be able to be visible to the user.
	*/
	this.setVisible = function(){
		this.hidden = false;
		this.ideaDiv.show();
	}

	this.setDiv = function(ideaDiv) {
		this.ideaDiv = ideaDiv;
	}

	this.delete = function(){
		this.deleted = true;
		this.hide;
	}

	this.getTitle = function(){
		return this.title;
	}

	this.getCategory = function(){
		return this.category;
	}

	this.getCost = function(){
		return this.cost;
	}

	this.getDescription = function(){
		return this.description;
	}
	
	this.getPictures = function(){
		return this.pictures;
	}

	this.getTags = function(){
		return this.tags;
	}

	this.isHidden = function(){
		return this.hidden;
	}

	this.isDecided = function(){
		return this.decided;
	}

	/*
	* Determines whether the idea has been deleted by the user or not.
	* Returns true if it has been deleted and False otherwise.
	*/
	this.isDeleted = function(){
		return this.deleted;
	}

	this.getHtml = function(){
		var ideaTags = this.getTags();

		var html = "<h2 style='font-size:150%;margin-top:0px'>"+this.getTitle()+"</h1>";
		html += "<img src='Jellyfish.jpg' width='60%' style='display:block;margin-right:auto;margin-left:auto'>";
		// html += "<h2 style='font-size:125%;text-align:left'>Category: "+this.getCategory()+"</h2>"
		html += "<h2 style='font-size:125%;text-align:left'>"+this.getDescription()+"</h2>";
		
		for (var tagIndex in ideaTags){
			html += "<h2 style='border: 1px solid black; border-radius: 10px; font-size:125%; text-align:left'>";
			html += ideaTag(tagIndex);
			html += "</h2>";
		}

		// html += "<br>"
		html += "<h2 style='font-size:125%; text-align:left'>Cost $" + this.getCost() + "</h2>";
		html += "<div style='text-align:center'>"
		html += "<button type='button' class='btn editIdeaView'>Edit</button>";
		return html;
	}

}




