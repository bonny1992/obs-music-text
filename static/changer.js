var original_text = "";
$.wait = function( callback, seconds){
   return window.setTimeout( callback, seconds * 1000 );
}

$( document ).ready(function() {

    var ajax_call = function() {
        $.get("/_get_title", function (data) {
            original_text = data;
            var obj = $.parseJSON(data);
            $('#artist').text(obj.artist);
            $('#songname').text(obj.songname);
            $('#artist')
                .animate(
                    {opacity: 1,
                    paddingLeft: 150},
                    { queue: false, duration: 'slow' }
                );
            $.wait(function () {
                $('#songname')
                    .animate(
                        {opacity: 1,
                        paddingLeft: 150},
                        { queue: false, duration: 'slow' }
                    );
            }, 0.2);
        });
    };
    ajax_call();
});


setInterval(function()
{
     var ajax_call = function() {
        $.get("/_get_title", function (data) {
            if(data != original_text)
            {
                $('#artist')
                .animate(
                    {opacity: 0,
                    paddingLeft: 0},
                    { queue: false, duration: 'slow' }
                );
                $.wait(function () {
                    $('#songname')
                        .animate(
                            {opacity: 0,
                            paddingLeft: 0},
                            { queue: false, duration: 'slow' }
                        );
                }, 0.2);
                $.wait(function () {
                    var obj = $.parseJSON(data);
                    $('#artist').text(obj.artist);
                    $('#songname').text(obj.songname);
                    $('#artist')
                        .animate(
                            {opacity: 1,
                            paddingLeft: 150},
                            { queue: false, duration: 'slow' }
                    );
                    $.wait(function () {
                        $('#songname')
                            .animate(
                                {opacity: 1,
                                paddingLeft: 150},
                                { queue: false, duration: 'slow' }
                            );
                    }, 0.2);
                    original_text = data;
                }, 1)
            }
            else
            {
                console.log("No differences.")
            }
        });
    };
    ajax_call();
},
    1000);