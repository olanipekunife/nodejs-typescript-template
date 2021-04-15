import express, { NextFunction, Request, Response } from "express";

import controller from "../controllers/sample";

const router = express.Router();

router.post("/", controller.sample);

export = router;
