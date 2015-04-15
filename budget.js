// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {

    editable();
    calculate();


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
        var next_row = '<div class="row">' + '<div class="editable col-md-6 category">' + category + '</div>' + '<div class="editable col-md-3 spent">' + spent + '</div>' + '<div class="editable col-md-3 allotted">' + allotted + '</div>' + '</div>';
        return next_row;
    }


    function calculateTotal(class_name) {
        var sum = 0;
        $(class_name).each(function() {
            if (!isNaN(this.value) && this.value.length != 0) {
                sum += parseFloat(this.value);
            }
            return sum;
            console.log(sum);
        });
    }


    //Get totals
    function calculate() {
        $(".editable.spent").each(function() {
            var class_name = ".editable.spent";
            //$(this).keyup(function() {
            var total_spent = calculateTotal(class_name);
            console.log(total_spent);
            //});
            $("#total_spent").val(total_spent);
        });


        $(".editable.allotted").each(function() {
            var class_name = ".editable.allotted";
            //$(this).keyup(function() {
            var total_allotted = calculateTotal(class_name);
            console.log(total_allotted);
            //});
            $("#total_allotted").val(total_allotted);
        });
    }

    //Switch between span and textbox
    function editable() {
        $(".editable").click(function() {
            //Reference the Label.
            var label = $(this);

            //Add a TextBox next to the Label.
            label.after("<input type = text + style = 'display:none' />");

            //Reference the TextBox.
            var textbox = $(this).next();

            //Set the name attribute of the TextBox.
            textbox[0].name = this.id.replace("lbl", "txt");

            //Assign the value of Label to TextBox.
            textbox.val(label.html());

            //When Label is clicked, hide Label and show TextBox.
            label.click(function() {
                $(this).hide();
                $(this).next().show();
            });

            //When focus is lost from TextBox, hide TextBox and show Label.
            textbox.focusout(function() {
                $(this).hide();
                $(this).prev().html($(this).val());
                $(this).prev().show();
            });
        });
    }


});