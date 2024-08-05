import contactModel from "../models/contactModels.js";

// Handler to save a new message from a user
const getMessageFromUser = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, email, and message are required",
      });
  }

  try {
    const newContact = new contactModel({ name, email, message });

    await newContact.save();
    res
      .status(201)
      .json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Handler to get all messages for admin
const getMessageToAdmin = async (req, res) => {
  try {
    const messages = await contactModel.find();
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getMessageFromUser, getMessageToAdmin };
