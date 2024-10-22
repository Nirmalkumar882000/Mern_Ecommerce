const User = require("../../modals/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
require("dotenv").config()

const Client_Secret_Key = process.env.JWT_KEY



const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        // validation
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        // user check details
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        // password secured
        const hashPassword = await bcrypt.hash(password, 12)
        // user Save
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save()

        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const checkUser = await User.findOne({ email })

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)

        if (!checkPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            userName: checkUser.userName,
            role: checkUser.role
        },
            Client_Secret_Key,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60
        }).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: checkUser._id,
                email: checkUser.email,
                userName: checkUser.userName,
                role: checkUser.role
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const logOutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "User logged out successfully"
    })
}



const authMiddleWare = async (req, res) => {
    const token = req.cookie.token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User !"
        })
    }
    try {
        const decoded = jwt.verify(token, Client_Secret_Key);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized User !"
        })
    }

}





module.exports = { registerUser, loginUser, logOutUser, authMiddleWare }