class Sockets {
    constructor(io){
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // ON CONNECTION:
        this.io.on('connection', (socket) => { 
        // Listen for new message from client:
        socket.on('send-message-to-server', (data) => {
            console.log(data);

            this.io.emit('send-messages-from-server', data);
            })
        });

    }
}

module.exports = Sockets;