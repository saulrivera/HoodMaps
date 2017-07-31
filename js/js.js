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
    ctx.globalCompositeOperation = "xor";

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - (stab + head);
    }

    if (!localStorage.getItem('session')) {
        var session = {
        'points': [],
        'state': true,
        'item': 0
        }
    } else {
        var session = JSON.parse(localStorage.getItem('session'));
        unwrap(session);
    }
    var i = session.item;

    $('.map').bind('mousedown', function() {
        mouseIsDown = true;
    });
    $('.map').bind('mousemove', function(e) {
        if (!mouseIsDown) return;
        var offsetX = $(this).offset().left;
        var offsetY = $(this).offset().top;
        var x = e.pageX - offsetX;
        var y = e.pageY - offsetY;

        session.item = i;
        session.points.push({'color': ctx.fillStyle, 'x': x, 'y': y});
        i++;
        console.log(session);

        draw(ctx.fillStyle, x, y);

    });
    $('.map').bind('mouseup', function(e) {
        mouseIsDown = false;
        localStorage.setItem('session', JSON.stringify(session));
    })
    $('.color-picker div').bind('click', function() {
        ctx.fillStyle = $(this).data('color');
        $('.color-picker div').removeClass('active');
        $(this).addClass('active');
    });

    function unwrap(session) {
        session.points.forEach(function(a) {
            draw(a.color, Number(a.x), Number(a.y));
        });
    };

    function draw(color, x, y) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, 2*Math.PI);
        ctx.fill();
    }
    
});

