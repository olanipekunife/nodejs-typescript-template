import { Response, NextFunction, Request } from "express";
import unAuthorized from "./unAuthorized";
import unProcessable from "./unProcessable";
import serverError from "./serverError";
import ok from "./ok";
import notFound from "./notFound";
import forbidden from "./forbidden";
import badRequest from "./badRequest";

const response = (req, res, next): void => {
  res.unAuthorized = unAuthorized;
  res.unProcessable = unProcessable;
  res.serverError = serverError;
  res.ok = ok;
  res.notFound = notFound;
  res.forbidden = forbidden;
  res.badRequest = badRequest;
  next();
};
export default response;
