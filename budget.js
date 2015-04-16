// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

    var total_budget = 4000; //Set total budget here -- dummy data
    document.getElementById('total_budget').innerHTML = total_budget;
    editable();
    calculate();

    //Editable from edit button
    $('.edit-btn').click(function(e) {
        $(this).css("color","steelblue");
        var $row = $(this).closest('div[class^="row"]'); 
        $row.children('.editable:first').click();
    });

    //Highlight textbox of closest box when edit button clicked
    function focusOnEdit(target) {
        //Reference the Label.
        var label = target;

        //Add a TextBox next to the Label.
        label.after("<input style = 'display:none' />");

        //Reference the TextBox.
        var textbox = $(this).next();
        textbox.addClass(label.attr('class'));

        //Set the name attribute of the TextBox.
        textbox[0].name = this.id.replace("lbl", "txt");

        //Assign the value of Label to TextBox.
        textbox.val(label.html());

        //When Label is clicked, hide Label and show TextBox.
        label.click(function() {
            $(this).hide();
            $(this).next().show().select();
        });

    }

    //Delete confirmation
    $('.delete_confirm').click(function (e) {
        if (confirm("Are you sure you want to " + $(this).attr("title") + "?")) {
            var $killrow = $('#delete_btn').closest('div[class^="row"]');
               $killrow.addClass("danger");
               $killrow.fadeOut(500, function() {
                   $killrow.remove();
               });
        } 
    });

    // Only numbers allowed
      $('#new_spent').on('change keyup', function() {
          // Remove invalid characters
          var sanitized = $(this).val().replace(/[^0-9.]/g, '');
          // Remove the first point if there is more than one
          sanitized = sanitized.replace(/\.(?=.*\.)/, '');
          // Update value
          $(this).val(sanitized);
      });

      // Only numbers allowed
      $('#new_allotted').on('change keyup', function() {
          // Remove invalid characters
          var sanitized = $(this).val().replace(/[^0-9.]/g, '');
          // Remove the first point if there is more than one
          sanitized = sanitized.replace(/\.(?=.*\.)/, '');
          // Update value
          $(this).val(sanitized);
      });

    //Textboxes for adding new category
    $('.new_entry').keyup(function(event) {
        if (event.keyCode == 13) {
            var spent = ($('#new_spent').val() == "") ? 0 : $('#new_spent').val();
            var allotted = ($('#new_allotted').val() == "") ? 0 : $('#new_allotted').val();
            var category = ($('#new_category').val() == "") ? 'My new category' : $('#new_category').val();
            populate_list(category, spent, allotted);
            $('.new_entry').val("");
            $('#new_category').focus();
            editable();
            calculate();
        }
    });

    //Add row for entered item
    function populate_list(category, spent, allotted) {
        $next_row = $(".items")
            .append($('<div>').attr("class","row")
                .append($('<div>').attr("class","col-md-1")
                    .append($('<button></button>').addClass("btn edit-btn btn-s")
                        .append($('<span></span>').addClass('glyphicon glyphicon-edit pull-right'))))
                .append($('<div>').attr("class","editable category col-md-4").text(category))
                .append($('<div>').attr("class","editable category col-md-3").text(spent))
                .append($('<div>').attr("class","editable category col-md-3").text(allotted))

        );

        var btn = document.createElement('button');
        btn.type = "button";
        btn.className = "btn delete_confirm btn-s btn-danger";
        btn.id = "delete_btn";

        $(btn).append($('<span></span>')
            .addClass('glyphicon glyphicon-open'));
      
        $next_row.append($("<div>"))
            .attr("class", "col-md-1");

        $(btn).appendTo($next_row.closest('td'));

    }


    //Get totals
    function calculate() {
        $(".editable.spent").each(function() {
            var class_name = ".editable.spent";
            total_spent = calculateTotal(class_name);
            $("#total_spent").html(total_spent);
        });


        $(".editable.allotted").each(function() {
            var class_name = ".editable.allotted";
            var total_allotted = calculateTotal(class_name);
            $("#total_allotted").html(total_allotted);
            
            var remaining = total_budget - total_allotted;
            $("#remaining_budget").html(remaining);
            if (remaining < 0) {
                $("#remaining").css({"color":"red"});
                $("#total_allotted").css({"color":"red"});
            }
        });
 
        
    }

    function calculateTotal(class_name) {
        var sum = 0;
        $(class_name).each(function() {
            var value = parseFloat(this.innerHTML);
            sum += value;
        });
    return sum;
    }


    //Switch between span and textbox
    function editable() {
        $(".editable").click(function() {
            //Reference the Label.
            var label = $(this);

            //Add a TextBox next to the Label.
            label.after("<input style = 'display:none' />");

            //Reference the TextBox.
            var textbox = $(this).next();
            textbox.addClass(label.attr('class'));

            //Set the name attribute of the TextBox.
            textbox[0].name = this.id.replace("lbl", "txt");

            //Assign the value of Label to TextBox.
            textbox.val(label.html());

            //When Label is clicked, hide Label and show TextBox.
            label.click(function() {
                $(this).hide();
                $(this).next().show().select();
            });

            //When focus is lost from TextBox, hide TextBox and show Label.
            textbox.keyup(function(event) {
                if(event.keyCode == 13) {
                    $(this).hide();
                    $(this).prev().html($(this).val());
                    $(this).prev().show();
                }
            });

             textbox.blur(function(event) {
                $(this).hide();
                $(this).prev().html($(this).val());
                $(this).prev().show();
            });
        });
    }

    


});