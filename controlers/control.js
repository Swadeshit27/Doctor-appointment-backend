const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../model/collection");

// user sign up section
const userRegistor = async (req, res) => {
    const photo = req.file.filename; 
    const { name, email, mobile, password } = req.body;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(200).json({ message: "Email already exist", success: false });
        }
        //   password hash
        const hashpassword = await bcrypt.hash(password, 12);
        // create document
        let user = new User({
            name,
            email,
            mobile,
            password: hashpassword,
            photo
        });
        //   generate jesonwebtoken
        await user.save();
        // const token = jwt.sign(
        //     { id: User._id },
        //     process.env.SECRET_KEY,
        //     { expiresIn: '1d' }
        // );
        return res.status(201).json({ message: "user registered successfully", success: true});
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Internal Error", success: false });
    }
}
// user log in section
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        if (userExist) {
            const ismatch = await bcrypt.compare(password, userExist.password);
            if (ismatch) {
                //   generate jesonwebtoken
                const token = jwt.sign(
                    { id: userExist._id },
                    process.env.SECRET_KEY,
                    { expiresIn: '1d' }
                );
                return res.status(201).json({ message: "Log in successful", success: true, token });
            }
            else return res.status(400).json({ message: "Invalid details", success: false });
        }
        res.status(400).json({ message: "Email not exist", success: false });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Server error", success: false });
    }
}

// user Details section
const userDetail = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        // console.log(user)
        res.status(201).json({ user, success: true })
    } catch (error) {
        console.log(error)
        res.status(`401`).json({ message: "user not found", success: false })
    }
}
module.exports = { userLogin, userRegistor, userDetail }