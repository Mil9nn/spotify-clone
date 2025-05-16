import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
		const currentUserId = req.auth.userId;
		const users = await User.find({ clerkId: { $ne: currentUserId } });
		if (!users) {
			return res.status(404).json({ message: "No users found" });
		}
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
}

export const getMessages = (req, res) => {
    res.send("get all messages route");
}