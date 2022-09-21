import dotenv from "dotenv";
import app from "./app";
import http from "http";

dotenv.config();

const port = process.env.PORT || 3000;
app.set("port", port);
const server = http.createServer(app);

server.on("listening", () => {
  console.log("Listening on port " + port);
});

server.listen(port);
