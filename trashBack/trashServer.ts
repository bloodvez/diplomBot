import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

// const IP_ADDRESS = "192.168.200.46";
const IP_ADDRESS = "localhost";
const PORT = 5555;

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  basicEmit: (a: number) => void;
}

interface ITrashServer {
  expressApp: Express;
  httpServer: http.Server;
  socketServer: Server;
  registerSocketEvents():void;
}

class TrashServer implements ITrashServer {
  expressApp: express.Express;
  httpServer: http.Server;
  socketServer: Server<ServerToClientEvents, ClientToServerEvents, DefaultEventsMap>;

  constructor() {
    this.expressApp = express();
    this.httpServer = http.createServer(this.expressApp);
    this.socketServer = new Server(this.httpServer);

    this.expressApp.use(express.static("build"));

    this.expressApp.get("/", (req, res) => {
      res.send("hi");
      console.log("hi");
    });

    this.httpServer.listen(PORT, IP_ADDRESS, () => {
      console.log(`listening on ${IP_ADDRESS}:${PORT}`);
    });

    this.registerSocketEvents();
  }

  registerSocketEvents() {
    this.socketServer.on("connection", (socket) => {
      console.log("a user connected");
    });
  }
}

let trashServer = new TrashServer();
