import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// payment shipcode
const placeOrder_Cod = async (req, res) => {
  try {
    // Tạo đơn hàng mới
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Trả về phản hồi thành công
    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user order for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updateing order status
const updateStatus = async (req, res) => {
  try {
    const updateData = { status: req.body.status };

    // Nếu trạng thái đơn hàng là "Delivered", cập nhật trạng thái thanh toán
    if (req.body.status === "Delivered") {
      updateData.payment = true;
    }

    await orderModel.findByIdAndUpdate(req.body.orderId, updateData);

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get revunue
const getRevenueReal = async (req, res) => {
  try {
    const paidOrders = await orderModel.find({ payment: true });
    const totalRevenue = paidOrders.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    res.json({ success: true, revenue: totalRevenue });
  } catch (error) {
    res.json({ success: false, message: "Error retrieving revenue" });
  }
};

const getRevenue = async (req, res) => {
  try {
    const allOrders = await orderModel.find({});
    const totalRevenue = allOrders.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    res.json({ success: true, revenue: totalRevenue });
  } catch (error) {
    res.json({ success: false, message: "Error retrieving revenue" });
  }
};

// all monthly reveune
const getMonthlyRevenue = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    startOfMonth.setHours(0, 0, 0, 0); // Ensure it starts at the beginning of the day
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    endOfMonth.setHours(23, 59, 59, 999); // Ensure it ends at the end of the day

    const monthlyRevenue = await orderModel.aggregate([
      {
        $match: {
          data: { $gte: startOfMonth, $lt: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ success: true, revenue: monthlyRevenue[0].totalRevenue });
  } catch (error) {
    res.json({ success: false, message: "Error retrieving monthly revenue" });
  }
};

// all monthly order
const getMontlyOrder = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    startOfMonth.setHours(0, 0, 0, 0); // Ensure it starts at the beginning of the day
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );
    endOfMonth.setHours(23, 59, 59, 999); // Ensure it ends at the end of the day

    const monthlyOrderCount = await orderModel.countDocuments({
      data: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.json({ success: true, count: monthlyOrderCount });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving monthly order count",
    });
  }
};

const getMonthlyRevenueDetails = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    const monthlyRevenue = {};

    // Initialize monthlyRevenue with all months
    const allMonths = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(i);
      return date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
    });

    allMonths.forEach((month) => {
      monthlyRevenue[month] = { total: 0, paid: 0 };
    });

    orders.forEach((order) => {
      const month = new Date(order.data).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthlyRevenue[month].total += order.amount;
      if (order.payment) {
        monthlyRevenue[month].paid += order.amount;
      }
    });

    res.json({ success: true, monthlyRevenue });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving monthly revenue data",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryData = await orderModel.aggregate([
      { $unwind: "$items" }, // Unwind the items array
      {
        $group: {
          _id: "$items.category", // Group by category field in items
          quantity: { $sum: "$items.quantity" }, // Sum quantity for each category
        },
      },
      {
        $project: {
          category: "$_id", // Rename _id to category
          quantity: 1, // Include quantity in the result
          _id: 0, // Exclude _id field from the result
        },
      },
    ]);

    res.json({ success: true, categoryData });
  } catch (error) {
    console.error("Error fetching category data", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching category data" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus,
  placeOrder_Cod,
  getRevenue,
  getRevenueReal,
  getMontlyOrder,
  getMonthlyRevenue,
  getMonthlyRevenueDetails,
  getCategory,
};
