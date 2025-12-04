const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const { getSocketIdByUserId, io } = require("../utils/socket");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find(
    { _id: { $ne: req.currentUser._id } },
    { password: 0, __v: 0 }
  );
  res.status(200).json({ message: "Users fetched successfully", users });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const senderId = req.currentUser.id;

  const messsages = await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId },
    ],
  });

  res.status(200).json({ message: "Messages fetched successfully", messsages });
});

exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { id: receiverId } = req.params;
  const senderId = req.currentUser.id;
  const { message, image } = req.body;

  let imageUrl;
  if (image) {
    const uploadResult = await cloudinary.uploader.upload(image);
    imageUrl = uploadResult.secure_url;
  }

  const newMessage = await Message.create({
    sender: senderId,
    receiver: receiverId,
    text: message,
    image: imageUrl,
  });
  await newMessage.save();

  const receiverSocketId = await getSocketIdByUserId(receiverId);
  if (receiverSocketId) io.to(receiverSocketId).emit("message", newMessage);

  res.status(200).json({ message: "Message sent successfully", newMessage });
});
