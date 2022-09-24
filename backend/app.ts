import express from "express";
import bodyParser from "body-parser";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import type { RESTGetAPIUserResult, Snowflake } from "discord-api-types/v9";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (request, response, next) => {
  response.json({ message: "server response" });
  next();
});

const token = process.env.TOKEN as string;

const rest = new REST({}).setToken(token);

const fetchUser = async (id: Snowflake): Promise<RESTGetAPIUserResult> =>
  rest.get(Routes.user(id)) as Promise<RESTGetAPIUserResult>;

app.post("/getuser", async function getUser(request, response) {
  let user = {};
  try {
    user = await fetchUser(request.body.id as string);
  } catch (error) {
    console.error(error);
  } finally {
    response.json(user);
  }
});

export default app;
