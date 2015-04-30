// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

    var total_budget = 4000; //Set total budget here -- dummy data
    document.getElementById('total_budget').innerHTML = total_budget;
    var remaining = total_budget;
    var total_spent = 0;
    var total_allotted = Math.floor(total_budget/7);
    default_budget();
    calculate();
    calculateRemaining();
    editable();
    delete_confirm();


    //Populate with default numbers
    function default_budget() {
        $(".editable.spent").html(total_spent);
        $(".editable.allotted").html(total_allotted);
    }

    //Delete confirmation
    function delete_confirm() {
        $('.delete_confirm').click(function (e) {
            if (confirm("Are you sure you want to " + $(this).attr("title") + "?")) {
                var $killrow = $(this).closest('div[class^="row"]');
                   $killrow.addClass("danger");
                   $killrow.fadeOut(500, function() {
                       $killrow.remove();
                   });
            } 
        });
    }

    // Only numbers allowed
      

      // Only numbers allowed
      $('#new_allotted').on('change keyup', function() {
          // Remove invalid characters
          var sanitized = $(this).val().replace(/[^0-9.]/g, '');
          // Remove the first point if there is more than one
          sanitized = sanitized.replace(/\.(?=.*\.)/, '');
          // Update value
          $(this).val(sanitized);
      });

    //Get totals
    function calculate() {

        $(".editable.spent").each(function() {
            var class_name = ".editable.spent";
            total_spent = calculateTotal(class_name);
            $("#total_spent").html(total_spent);
            if (total_spent > total_budget) {
                $("#total_spent").css({"color":"red"});
                $("#totals_title").css({"color":"red"});
            }
        });


        $(".editable.allotted").each(function() {
            var class_name = ".editable.allotted";
            calculateRemaining();

        });
    }

    //Calculate after update
    function calculateUpdate(class_name) {
        if (class_name.match("spent")) {
            class_name = ".editable.spent";
            total_spent = calculateTotal(class_name);
            $("#total_spent").html(total_spent);
            if (total_spent > total_budget) {
                $("#total_spent").css({"color":"red"});
                $("#totals_title").css({"color":"red"});
            }
        }

        if (class_name.match("allotted")) {
            class_name = ".editable.allotted";
            calculateRemaining(); 
        }
    }

    function calculateRemaining() {
        var class_name = ".editable.allotted";
        total_allotted = calculateTotal(class_name);
        $("#total_allotted").html(total_allotted);
        
        remaining = total_budget - total_allotted;
        $("#remaining_budget").html(remaining);
        if (remaining < 0) {
            $("#remaining").css({"color":"red"});
            $("#total_allotted").css({"color":"red"});
        }
        
        (function (global) {
            global.localStorage.setItem("shared_remaining_budget", remaining);
        }(window));
    }

    function calculateTotal(class_name) {
        var sum = 0;
        $("div"+ class_name).each(function() {
            var value = parseFloat(this.innerHTML);
            sum += value;
        });
        return sum;
    }


    //Switch between span and textbox
    function editable() {
        $(".editable").mouseover(function() {

            //Only numbers allowed
            $('.editable').on('change keyup', function() {
                 // Remove invalid characters
                 var sanitized = $(this).val().replace(/[^0-9.]/g, '');
                 // Remove the first point if there is more than one
                 sanitized = sanitized.replace(/\.(?=.*\.)/, '');
                 // Update value
                 $(this).val(sanitized);
             });

            var class_name = $(this).attr("class");
            var id_name = $(this).attr("id");

            //Reference the Label.
            var label = $(this);

            //Add a TextBox next to the Label.
            label.after("<input style = 'display:none' />");

            //Reference the TextBox.
            var textbox = $(this).next();
            textbox.addClass(label.attr('class'));

            //Set the id attribute of the TextBox.
            textbox.id = this.id.replace("lbl", "txt");

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
                    calculateUpdate(class_name);

                    if(id_name === "total_budget") {
                        total_budget = $(this).val();
                        calculateRemaining();
                    }
                    
                }
            });

            textbox.blur(function(event) {
                $(this).hide();
                $(this).prev().html($(this).val());
                $(this).prev().show();
                calculateUpdate(class_name);

                if(id_name === "total_budget") {
                    total_budget = $(this).val();
                    calculateRemaining();
                }
            });

        });

    }



});


    // //Add row for entered item
    // function populate_list(category, spent, allotted) {
    //     $next_row = $(".items")
    //         .append($('<div>').addClass("row")
    //             .append($('<div>').addClass("col-md-1")
    //                 .append($('<button>').addClass("btn edit-btn btn-s")
    //                     .append($('<span>').addClass('glyphicon glyphicon-edit pull-right'))))
    //             .append($('<div>').addClass("editable category col-md-4").text(category))
    //             .append($('<div>').addClass("editable spent col-md-3").text(spent))
    //             .append($('<div>').addClass("editable allotted col-md-3").text(allotted))
    //             .append($('<div>').addClass("delete_space col-md-1")
    //                 .append($('<button>').addClass("btn delete_confirm btn-s btn-danger")
    //                     .attr("title", "delete")
    //                     .append($('<span>').addClass('glyphicon glyphicon-trash'))))

    //     );
    // }
    // 
    
    // //Editable from edit button
    // function edit_with_btn() {
    //     $('.edit-btn').click(function(e) {
    //         $(this).css("color","steelblue");
    //         var $row = $(this).closest('div[class^="row"]'); 
    //         $row.children('.editable:first').click();
    //     });
    // }


    // //Textboxes for adding new category
    // $('.new_entry').keyup(function(event) {
    //     if (event.keyCode == 13) {
    //         var spent = ($('#new_spent').val() == "") ? 0 : $('#new_spent').val();
    //         var allotted = ($('#new_allotted').val() == "") ? 0 : $('#new_allotted').val();
    //         var category = ($('#new_category').val() == "") ? 'My new category' : $('#new_category').val();
    //         populate_list(category, spent, allotted);
    //         $('.new_entry').val("");
    //         $('#new_category').focus();      
    //         calculate();
    //         editable();
    //         delete_confirm();
    //         //edit_with_btn();
    //     }
    // });

