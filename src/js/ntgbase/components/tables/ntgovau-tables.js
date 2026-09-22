$(document).ready(function() {
    
    // Set 5 milliseconds timeout to catch dynamic tables produced from SQUIZ
    // Set default tables to bootstrap default table styles
    setTimeout(function(){
        
        $(".ntg-body table").each( function() {
            
            if (!$(this).hasClass("table")) {
                $(this).addClass("table").wrap('<div class="table-responsive">');
            } 
            
            else {
             //
            }

        });

        $('.dataTables_paginate .paginate_button').removeClass('external');
        
    }, 5);

    // fixing table overflow issue when use datatable    
    setTimeout(function(){
        $(".ntg-body table").each( function() {
            if($(this).hasClass('dataTable')) {
                $(this).closest('.table-responsive').css('overflow', 'initial');
            }
        });
  }, 50);
    
});