var app = (function () {

    class Point{
        constructor(x,y){
            this.x=x;
            this.y=y;
        }
    }

    var stompClient = null;
    var id;

    var addPointToCanvas = function (point) {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
        ctx.stroke();
    };


    var getMousePosition = function (evt) {
        canvas = document.getElementById("canvas");
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    };


    var connectAndSubscribe = function (callback) {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newpoint', function (eventbody) {
                var obj = JSON.parse(eventbody.body);
                callback(new Point(obj.x,obj.y));
            });
        });
    };

    return {
        init: function () {
            id = $("#nDib").val();
            var can = document.getElementById("canvas");
            can.addEventListener("pointerdown",function (evento) {
                var position = getMousePosition(evento);
                app.publishPoint(position.x,position.y);
            })
            //websocket connection
            connectAndSubscribe(addPointToCanvas);
        },

        publishPoint: function(px,py){
            console.info(id);
            var pt=new Point(px,py);
            console.info("publishing point at "+pt);
            addPointToCanvas(pt);
            stompClient.send("/topic/newpoint",{},JSON.stringify(pt));
            //publicar el evento
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        }
    };

})();