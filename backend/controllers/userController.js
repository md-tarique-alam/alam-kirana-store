const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const transporter = require("../config/mail");

exports.signup = async (req, res) => {
    try {

        const { name, email, mobile, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10);

        const userSignup = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "signup successful",
            user: userSignup,
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { identifiers, password } = req.body

        const user = await User.findOne({
            $or: [
                { email: identifiers },
                { mobile: identifiers }
            ]
        });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "invalid password"
            })
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true, secure: false })

        return res.status(200).json({
            message: "login successful",
            user: {
                name: user.name,
                role: user.role
            }
        });

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        res.status(200).json({
            message: "logout successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("name role");
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.status(200).json({ user })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.findUser = async (req, res) => {
    try {
        const user = await User.find().select("name email mobile");
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }
        return res.status(200).json({ user })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}



exports.userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("name email mobile");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        const user = await User.findByIdAndUpdate(req.user.userId, { name, email, mobile }, { new: true, runValidators: true })
        res.status(200).json({
            message: "Profile updated successfully",
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;

        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        await user.save();

        await transporter.sendMail({
            from: `"Alam Kirana Store" <${process.env.MAIL_USER}>`,
            to: user.email,
            subject: "Reset your Alam Kirana password",

            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Reset your password</h2>

            <p>Hello ${user.name},</p>

            <p>
                We received a request to reset your Alam Kirana Store password.
            </p>

            <p>
                Click the button below to create a new password.
                This link will expire in 15 minutes.
            </p>

            <a
                href="${resetUrl}"
                style="
                    display: inline-block;
                    padding: 12px 20px;
                    background: #65a30d;
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: bold;
                "
            >
                Reset Password
            </a>

            <p style="margin-top: 20px;">
                If you did not request this password reset, you can safely ignore this email.
            </p>
        </div>
    `,
        });

        res.status(200).json({
            message: "Password reset request created",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
  
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
