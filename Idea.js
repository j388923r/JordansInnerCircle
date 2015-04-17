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

		var html = "<form action='#'>";
		html += "<h1>"+this.getTitle()+"</h1><br>";
		html += "<h3>"+this.getCategory()+"</h3><br>"
		html += "<img src='Jellyfish.jpg' height='50%' width='50%'><br>";
		html += "<p>"+this.getDescription()+"</p><br>";
		
		for (var tagIndex in ideaTags){
			html += "<p style='border: 1px solid black; border-radius: 10px;'>";
			html += ideaTag(tagIndex);
			html += "</p>";
		}

		html += "<br>"
		html += "<h3>$" + this.getCost() + "</h3><br>";
		html += "<button type='button' class='btn editIdeaView'>Edit</button>";
		html += "<button type='button' class='btn cancelIdeaView'>Cancel</button></form>";

		return html;
	}

}




