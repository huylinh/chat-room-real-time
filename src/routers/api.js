import express from "express";
import controller from "../controllers/controller";

let router = express.Router();

const initAPIRoutes = (app) => {
  router.get("/api", controller.index);
  router.get("/api/chat", controller.getAllMessage);
  router.get("/api/chat/:id", controller.getUserMessage);
  router.put("/api/chat", controller.seenMessage);
  router.post("/api/chat", controller.postMessage);
  router.post("/api/chat/all", controller.postMessageAllUsers);
  router.get("/api/user", controller.getAllUser);
  return app.use("/", router);
};

export default initAPIRoutes;
