// Server Express
const express = require('express');
const http = require('http');
// Server Socket
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // HTTP Server:
        this.server = http.createServer(this.app);
        // Socket Server:
        this.io = socketio(this.server, {});
    }
    middlewares() {
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        // CORS
        this.app.use(cors());
    }

    setupSockets() {
        new Sockets(this.io);
    }

    execute() {
        // Init middlewares:
        this.middlewares();
        // Init sockets:
        this.setupSockets();
        // Init server:
        this.server.listen(this.port, () => {
            console.log('Server is running on port: ', this.port);
        });
    }


}

module.exports = Server;