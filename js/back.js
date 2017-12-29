/*-----------------------------------/
  /*	DROPDOWN
  /*----------------------------------*/

$(document).ready(function () {
    $(document).off('click.bs.dropdowwn.data-api') ;
    dropdownOpen() ;
}) ;
function dropdownOpen() {

    $("li.dropdown").mouseover(function () {
        $(this).addClass('open') ;
    }) ;
    $("li.dropdown").mouseout(function () {
        $(this).removeClass('open') ;
    });
}

/*-----------------------------------/
  /*	MAIN
  /*----------------------------------*/

function adaptiveHeight(obj) {
    var mainheight = $(obj).contents().find("body").height()+50 ;
    $(obj).height(mainheight) ;
}
