const express = require('express');
var cors = require('cors');
const { socketController } = require('../sockets/sockets.controller');



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Exportacion de socket.io
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.pathsRoutes = {}                        

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

        //Sockets
        this.sockets();
    }

    middlewares(){
        
        // CORS
        this.app.use( cors() );
        
        // Directorio Publico
        this.app.use(express.static('public'));

    }

    routes(){

    }

    sockets(){

        this.io.on("connection", socketController);

    }

    listen(){         
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo puerto ${this.port}`);
        });
    }

}

module.exports = Server;