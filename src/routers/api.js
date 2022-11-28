import express from "express";
import controller from "../controllers/controller";

let router = express.Router();

const initAPIRoutes = (app) => {
  router.get("/api", controller.getAllMessage);
  return app.use("/", router);
};

export default initAPIRoutes;
