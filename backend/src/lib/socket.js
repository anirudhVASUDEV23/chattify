import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleWare } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

// | Object       | Context                                      | Similar To                  |
// | ------------ | -------------------------------------------- | --------------------------- |
// | **`io`**     | Represents the **Socket.IO server instance** | Similar to `app` in Express |
// | **`socket`** | Represents **one single connected client**   | Similar to `req` in Express |

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

//apply auth middleware to all socket connections
io.use(socketAuthMiddleWare);

const userSocketMap = {}; //{userId: socketId;}}

// Yes, exactly — there will only be one io server instance for your entire application.

// All connected clients (sockets) share that single io server. This is similar to how you have one Express app instance for all HTTP routes and requests.
io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;
  console.log("userSocketMap", userSocketMap);

  //io.emit sends events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //listen events from client
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    //notify all clients about the updated online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

/*
Object	Scope	Example
io.emit()	All connected clients	Broadcast to everyone
socket.emit()	Single connected client (the one represented by socket)	Just that user
io.to(socketId).emit()	Single or specific client by ID	Target a user by their socket ID
Rooms / namespaces	Groups of users	Broadcast to a room or namespace
*/
