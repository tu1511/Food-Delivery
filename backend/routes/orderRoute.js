import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getCategory,
  getMonthlyRevenue,
  getMonthlyRevenueDetails,
  getMontlyOrder,
  getRevenue,
  getRevenueReal,
  listOrders,
  placeOrder,
  placeOrder_Cod,
  updateStatus,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/stripe", authMiddleware, placeOrder);
orderRouter.post("/cod", authMiddleware, placeOrder_Cod);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);
orderRouter.get("/revenue", getRevenue);
orderRouter.get("/revenuereal", getRevenueReal);
orderRouter.get("/monthlyorder", getMontlyOrder);
orderRouter.get("/monthlyrevenue", getMonthlyRevenue);
orderRouter.get("/category", getCategory);
orderRouter.get("/detail", getMonthlyRevenueDetails);

export default orderRouter;
