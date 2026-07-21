import { Kysely, MysqlDialect } from 'kysely';
import mysql from 'mysql2';
import config from './config/config.js'

const db = new Kysely({
    dialect: new MysqlDialect({
        pool: mysql.createPool({
            user: config.getMysqlConfig().user,
            password: config.getMysqlConfig().password,
            database: config.getMysqlConfig().database,
            socketPath: config.getMysqlConfig().socketPath,
            connectionLimit: 100
        })
    })
});

export default db;