import express from "express";

import controller from "../controllers/oks";
const service = 'oks'
const router = express.Router();

router.get(`/${service}`, controller.find);

router.get(`/${service}/:id`, controller.findOne);

router.post(`/${service}`, controller.create);

router.put(`/${service}`, controller.update);

router.patch(`/${service}/:id`, controller.updateOne);

router.delete(`/${service}/:id`, controller.deleteOne);

export = router;