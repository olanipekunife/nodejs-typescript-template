"use strict";

import config from "../config";
import log from "../services/logger";
import { Sequelize, Op } from "sequelize";

// enable only operators that you need
const operatorsAliases = {
  // $and: Op.and,
  // $or: Op.or,
  $gt: Op.gt,
  $gte: Op.gte,
  $lt: Op.lt,
  $lte: Op.lte,
  // $ne: Op.ne,
  // $eq: Op.eq,
  // $not: Op.not,
  // $between: Op.between,
  // $notBetween: Op.notBetween,
  // $in: Op.in,
  // $notIn: Op.notIn,
  $like: Op.like,
  // $notLike: Op.notLike,
  // $iLike: Op.iLike, // PG Only
  // $notILike: Op.notILike, // PG Only
  // $regexp: Op.regexp, // PG/mySQL Only
  // $notReqexp: Op.notRegexp, // PG/mySQL Only
  // $iRegexp: Op.iRegexp, // PG Only
  // $notIRegexp: Op.notIRegexp, // PG Only
  // $overlap: Op.overlap, // PG Only
  // $contains: Op.contains, // PG Only
  // $contained: Op.contained, // PG Only
  // $any: Op.any // PG Only
};

const options: { [key: string]: any } = { operatorsAliases: operatorsAliases };
options.host = config.SQLHost;
options.port = config.SQLPort;
options.dialect = config.SQLDriver;
options.pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};
options.timezone = config.SQLTimezone;
// SQLite only
// options.storage = 'path/to/database.sqlite';

options.logging = function (...log) {
  return process.env.NODE_ENV === "production" ? false : console.log(log);
};

const sequelize = new Sequelize(
  config.SQLDatabase,
  config.SQLUsername,
  config.SQLPassword,
  options
);

sequelize
  .authenticate()
  .then(function () {
    log.info("SQL database connection successful");
  })
  .catch(function (err) {
    log.error("Unable to connect to the database: ", err);
  });

export default sequelize;
