const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require("../models/User")

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
            message : "login successful",
            user: {
            name : user.name,
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

exports.logout=async(req,res)=>{
    try{
    await res.clearCookie("token")
    res.status(200).json({
        message: "logout successfully"
    })
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }

}
exports.getUser=async (req,res)=>{
    try{
      const user=await User.findById(req.user.userId).select("name role");
      if (!user) {
    return res.status(404).json({
        message: "user not found"
    });
}F
     return res.status(200).json(user)
    }
    catch(error){
    res.status(500).json({
        message: "something went wrong"
    })
    }
}
