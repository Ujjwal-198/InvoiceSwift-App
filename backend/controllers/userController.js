import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { handleDeleteAllInvoicesByUserId } from './invoiceController.js';
import mongoose from "mongoose";

// --------------------------------------------------------- SIGNUP
export const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid input'
            }
        })

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({
            success: false,
            error: {
                code: "CONFLICT",
                message: "User already exists. Please Login to continue.",
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        
        const token = jwt.sign(
            { userId: user._id.toHexString(), name, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000,
        });

        if (user) {
            return res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                message: "User created successfully",
            });
        }


    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
                details: error.message,
            },
        });
    }
}

// --------------------------------------------------------- LOGIN
export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid input'
            }
        })

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "User not found. Please Signup to create an account",
                },
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Invalid email or password",
                },
            });
        }

        
        const token = jwt.sign(
            { userId: user._id.toHexString(), name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000, 
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "Login successful",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
                details: error.message,
            },
        });
    }
}

// --------------------------------------------------------- LOGOUT
export const handleLogout = async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true, 
    });
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

// --------------------------------------------------------CHECK-AUTH
export async function handleCheckAuth(req, res) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'No token provided' }
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({
            success: true,
            user: { id: decoded.userId, name: decoded.name, email: decoded.email }
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: 'Invalid token' }
        });
    }
}

// ---------------------DELETE ACCOUNT
export async function handleDeleteUser(req, res) {

    try {
        const { id: rawUserId, email } = req.user || {};

        if (!rawUserId) {
            return res.status(401).json({
                success: false,
                error: { code: "AUTHENTICATION_REQUIRED", message: "User ID is required" }
            });
        }

        const userIdStr = String(rawUserId);

        await handleDeleteAllInvoicesByUserId(userIdStr);

        let queryId = userIdStr;
        try { queryId = mongoose.Types.ObjectId(userIdStr); } catch (e) {  }

        let deletedUser = await User.findByIdAndDelete(queryId);

        if (!deletedUser && email) {
            deletedUser = await User.findOneAndDelete({ email });
        }

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.clearCookie('authToken', { httpOnly: true, sameSite: 'none' });
        return res.status(200).json({ success: true, message: 'User deleted successfully' });

    } catch (error) {
        console.error('handleDeleteUser error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
}