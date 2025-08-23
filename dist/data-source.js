"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dialect = process.env.DB_DIALECT ?? "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DT_PORT ? parseInt(process.env.DT_PORT) : 3306,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "1706Pvg@",
    database: process.env.DB_DATABASE || "nodeapi",
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
