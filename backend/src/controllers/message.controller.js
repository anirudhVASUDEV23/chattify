import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
        },
        {
          receiverId: loggedInUserId,
        },
      ],
    });

    const chartPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chartPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("Error in getChatPartners:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!receiverId && !text) {
      return res.status(400).json({ message: "Text or image are required" });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send message to yourself" });
    }

    const receiverExists = await User.findById(receiverId);
    if (!receiverExists) {
      return res.status(400).json({ message: "Receiver does not exist" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    // console.log("Message sent successfully", newMessage);
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ message: "Internalll Server Error" });
  }
};
