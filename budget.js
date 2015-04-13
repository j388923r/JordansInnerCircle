// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
    var lang_to = "English";
    var lang_from = "Spanish";
    var current_dict = dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	

    var is_autocomplete = false; 

    //Reverse the dictionary to Spanish:English 
    var new_dict = {};
    for (var pair in current_dict) {
        new_dict[current_dict[pair]] = pair;
    }

    //Words - used later for autocomplete
    var to_words = $.map(new_dict, function(key,value) {return key;});

    //Choose random key from new dictionary and display
    var current_word = get_random(new_dict);

    //Implement autocomplete 
    autocomplete(new_dict);

    //Enter in textbox triggers same as clicking
    $("#guess").keyup(function(event) {
        if (is_autocomplete == false) { // to avoid double entering
            if (event.keyCode == 13) {
                $("#submit").click();
            }
        }
        is_autocomplete = false; 
    });

    //Start playing
    new_game(new_dict, current_word);

    function new_game(new_dict, current_word) {
        //Check whether guess is correct and show feedback
        $('#submit').on("click", function() {
            var guess = $('#guess').val();	   
            var answer = new_dict[current_word];
     
	        if (guess != answer || !guess) { //Wrong or no answer
               	if (!guess) {guess = " "};	
                var next_row = incorrect_guess(current_word, guess, answer);
                $(".previous").prepend(next_row);
	        } else {
                var next_row = correct_guess(current_word, guess);
                $(".previous").prepend(next_row);
	        } 

            current_word = get_random(new_dict);
			$('#guess').val("").focus();
        });
    }

    //Add row for incorrect guess
    function incorrect_guess(current_word, guess, answer) {
        var next_row = '<div class="row false">' 
			+ '<div class="col-md-2 current_word"><span class="item">' + current_word + '</span></div>' 
			+ '<div class="col-md-2 guess"><span style="text-decoration:line-through">' + guess + '</span></div>' 
			+ '<div class="col-md-2 answer"><span class="item">' + answer + '</span></div>' + '</div>';
        return next_row;
    }

    //Add row for correct guess
    function correct_guess(current_word, guess) {
         var next_row = '<div class="row true">' 
	        + '<div class="col-md-2 current_word"><span class="item">' + current_word + '</span></div>'
	        + '<div class="col-md-2 guess"><span class="item">' + guess + '</span></div>'
	        + '<div class="col-md-2 answer"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></div>' 
	        + '</div>';
        return next_row;
    }

    //Get random word from dictionary
    function get_random(new_dict) {
        var keys = Object.keys(new_dict);
        current = keys[Math.floor(Math.random() * keys.length)];
        $('#current-word').html(current);
        return current;
    }

//Autocomplete
function autocomplete(new_dict) {
    $('#guess').autocomplete({
        source: function(request, response) { //return autocomplete matching only the start
            var matches = $.map(to_words, function(item) {
                if (item.indexOf(request.term) == 0) {
                    return item;
                } else {
                    return null;
                }
            });
            response(matches);
        },
        minLength: 2,
        select: function(event, ui) {
            is_autocomplete = true; //set to true to indicate that an autocomplete selection was made
            if (ui.item) {
                $(event.target).val(ui.item.value);
                $(".ui-menu-item").hide();
            }
            $('#submit').click();
            this.value = "";
            return false;
        }
    }).keyup(function(e) {
        if (e.which === 13) {
            $(".ui-menu-item").hide();
        }
    });
}

});



