import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const loginController = async (req, res) => {
    const { username, password } = req.body;

    // Kiểm tra tên người dùng và mật khẩu
    if (username === 'admin' && password === 'admin') {
        // Người dùng xác thực thành công

        const data = {
            username: username
        };
        const token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token: token });
    } else {
        // Xác thực không thành công
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

