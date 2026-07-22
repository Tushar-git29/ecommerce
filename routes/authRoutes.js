const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/multerCloudinary");
const Otp = require("../models/Otp");
const generateOtp = require("../utils/generateOtp");
const transporter = require("../config/email");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    // res.json(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
       process.env.SECRET_KEY, // use ENV variable in real projects
      { expiresIn: "1h" },
    );

    res.json({ message: "Login successful", token });
    // res.redirect("/home/all_products");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PROTECTED ROUTE
router.get("/me", auth, async (req, res) => {
  try {
    if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
    // req.user comes from jwt.verify in your auth middleware
    const user = await User.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/upload-profile", upload.single("profileImage"), (req, res) => {
  res.json({
    message: "Profile image uploaded",
    file: req.file,
  });
});

router.post("/image", upload.single("image"), (req, res) => {
  res.status(201).json({
    message: "Image uploaded successfully",
    imageUrl: req.file.path, // Cloudinary URL
    publicId: req.file.filename, // Cloudinary public_id
  });
});

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    //check weather the email id is registered or not
    const is_email_registered = User.findOne({ email: req.body.email });
    try {
      if (!is_email_registered.email) {
        res.json({
          message:
            "This email id is not registered.You need to register first.",
        });
      }
    } catch (error) {
      res.json(error);
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Remove old OTPs
    await Otp.deleteMany({ email });

    // Save new OTP
    await Otp.create({ email, otp, expiresAt });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <h2>Email Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "OTP sending failed",
      error: error.message,
    });
  }
});

//verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const mail_id = await Otp.findOne({ email: req.body.email });
    if (!mail_id) {
      res.status(404).json({ message: "email not found" });
    }

    const sended_otp = mail_id.otp;
    const received_otp = req.body.otp;
    if (sended_otp == received_otp) {
      res.status(200).json({ message: "otp is correct, reset your password" });
    } else {
      res.json({ message: "you've entered wrong otp" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,

      error: error.message,
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const requested_email = req.body.email;
    find_email = User.findOne({ email: requested_email });
    if (!find_email) {
      res.json({ message: "Don't have user registered with this email." });
    }
    const new_password = await bcrypt.hash(req.body.password, 10);

    const update = User.findOneAndUpdate(
      { email: req.body },
      { $set: { password: new_password } },
      { upsert: true, returnDocument: "after" },
    );
    res.status(200).json({
      message:
        "your new password is updated, you can login now with your new password.",
    });
  } catch (error) {
    res.status(500).json({ message: "bad response" });
  }
});

router.post("/verify-token", async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // decoded now contains payload (like userId, email, etc.)
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
