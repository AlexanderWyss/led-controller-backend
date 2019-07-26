import {Server} from "socket.io";

export default class Websocket {
    constructor(private socket: Server) {
        socket.on("connection", (socket) => {
        });
    }
}
