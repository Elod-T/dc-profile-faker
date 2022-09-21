"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.get("/", (request, response, next) => {
    response.json({ message: "server response" });
    next();
});
const token = process.env.TOKEN;
const rest = new rest_1.REST({}).setToken(token);
const fetchUser = (id) => __awaiter(void 0, void 0, void 0, function* () { return rest.get(v9_1.Routes.user(id)); });
app.post("/getuser", function getUser(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {};
        try {
            user = yield fetchUser(request.body.id);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            response.json(user);
        }
    });
});
exports.default = app;
