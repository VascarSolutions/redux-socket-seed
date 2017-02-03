var authenticate = require('./auth')

module.exports = function(io) {

    io.use(function (socket, next) {
        socket.ip = socket.handshake.address;
        socket.authenticated = false;
        next();
    });

    io.disconnectSocket = function (socketid) {
        if (!io.sockets.connected.hasOwnProperty(socketid)) {
            return;
        }
        var socket = io.sockets.connected[socketid];
        return socket.disconnect(true);
    };

    io.getConnectedSockets = function (){
        return io.sockets.connected;
    };

    io.on('connection', function (socket) {

        console.log("socket %s connected ", socket.id)


        socket.on('authenticate', function(options){
            if(authenticate(options)){
                socket.authenticated = true;
                socket.emit('authenticated')
            }else{
                socket.emit('unauthenticated')
                io.disconnectSocket(socket.id)
            }
        })

        socket.on('ping', function () {
            if(!socket.authenticated){
                return
            }
            console.log("socket %s ping", socket.id)
            socket.emit('pong')
        })

        socket.on('disconnect', function () {
            console.log("socket %s disconnected", socket.id)
        })
    });
}