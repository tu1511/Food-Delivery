import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://minhtu:1511@cluster0.d1lcqu5.mongodb.net/food-del",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Kết nối cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Lỗi kết nối cơ sở dữ liệu:", error);
    process.exit(1); // Thoát tiến trình với mã lỗi
  }
};
