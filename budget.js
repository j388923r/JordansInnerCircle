// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

    var total_budget = 40000; //Set total budget here -- dummy data
    document.getElementById('total_budget').innerHTML = total_budget;

    editable();
    calculate();

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
            var next_row = populate_list(category, spent, allotted);
            $(".items").append(next_row);
            $('.new_entry').val("");
            $('#new_category').focus();
            editable();
            calculate();
        }
    });

    //Add row for entered item
    function populate_list(category, spent, allotted) {
        var next_row = '<div class="row">' 
        + '<div class="col-md-1"><span class="glyphicon glyphicon-heart pull-right" aria-hidden="true"></span></div>' 
        + '<div class="editable category col-md-4">' + category + '</div>' 
        + '<div class="editable spent col-md-2">' + spent + '</div>' 
        + '<div class="editable allotted col-md-2">' + allotted + '</div>'
        + '<div class="btn trash col-md-1"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div>'
        + '</div>';
        return next_row;
    }

    //Delete with dialog box when clicking trash icon
    $('.trash').click(function(){

    });


    //Get totals
    function calculate() {
        $(".editable.spent").each(function() {
            var class_name = ".editable.spent";
            var total_spent = calculateTotal(class_name);
            $("#total_spent").html(total_spent);
        });


        $(".editable.allotted").each(function() {
            var class_name = ".editable.allotted";
            var total_allotted = calculateTotal(class_name);
            $("#total_allotted").html(total_allotted);
            $("#remaining_budget").html(total_budget - total_allotted);
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

    //Delete confirmation
    $('.delete_confirm').on('click', function(e) {
        $('#confirm')
            .modal({
                backdrop: 'static',
                keyboard: false
            })
            .one('click', '#delete', function(e) {
                //delete function
            });
    });

});