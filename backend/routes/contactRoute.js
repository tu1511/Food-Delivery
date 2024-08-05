import express from "express";
import {
  getMessageFromUser,
  getMessageToAdmin,
} from "../controllers/contactController.js";
import authMiddleware from "../middleware/auth.js";

const contactRouter = express.Router();

contactRouter.post("/message", authMiddleware, getMessageFromUser);
contactRouter.get("/get", getMessageToAdmin);

export default contactRouter;
