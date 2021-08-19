"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql2_1 = __importDefault(require("mysql2"));
var pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});
pool.query("SELECT NOW() AS time", function (err, result) {
    if (err)
        return console.log(err);
    var time = result[0].time;
    return console.log("[" + time.toLocaleDateString() + " " + time.toLocaleTimeString() + "] Database connection estabilished");
});
exports.default = pool.promise();
