$(function() {
    var mouseIsDown = false;
    var canvas = document.getElementById('map');
    var ctx = canvas.getContext('2d');

    var stab = Number($('.color-picker').height());
    var head = Number($('h1').height());
    
    $('#map').css('top', stab);

    $(resizeCanvas());

    ctx.fillStyle = "blue";
    ctx.globalAlpha = 0.05;
    ctx.globalCompositeOperation = "multiply";

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - (stab + head);
    }

    $('.map').bind('mousedown', function() {
        mouseIsDown = true;
    });
    $('.map').bind('mousemove', function(e) {
        if (!mouseIsDown) return;
        var offsetX = $(this).offset().left;
        var offsetY = $(this).offset().top;
        var x = e.pageX - offsetX;
        var y = e.pageY - offsetY;
        console.log(
            e.pageX,
            e.pageY
        );
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2*Math.PI);
        ctx.fill();
    });
    $('.map').bind('mouseup', function(e) {
        mouseIsDown = false;
    })
    $('.color-picker div').bind('click', function() {
        ctx.fillStyle = $(this).data('color');
        $('.color-picker div').removeClass('active');
        $(this).addClass('active');
    });
});