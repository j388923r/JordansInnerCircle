$(document).ready(function() 
    
    // call the tablesorter plugin 
    $("#myTable").tablesorter({ 
        // sort on the first column and third column, order asc 
        sortList: [[0,0],[2,0]] 
    }); 
); 