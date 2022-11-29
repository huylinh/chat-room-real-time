import express from "express";
import controller from "../controllers/controller";

let router = express.Router();

const initAPIRoutes = (app) => {
  router.get("/api/chat", controller.getAllMessage);
  router.get("/api/chat/:id_user", controller.getUserMessage);
  router.post("/api/chat", controller.postMessage);
  router.get("/api/user", controller.getAllUser);
  router.put("/api/chat/:id/:seen", controller.putMessage);
  return app.use("/", router);
};

export default initAPIRoutes;
