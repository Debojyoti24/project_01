const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Load environment variables immediately
dotenv.config();

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

/*
=================================
MIDDLEWARE CONFIGURATION
=================================
*/
const allowedOrigins = [
  "http://localhost:5173",
  "https://project-01-eight-tau.vercel.app",
  "https://project-01-yr7e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // ✅ FIXED: Checks the array OR checks if the incoming string contains your Vercel project domain signature
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.includes(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

/*
=================================
NODEMAILER TRANSPORTER SETUP
=================================
*/
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Reminder: This must be a 16-character Gmail App Password
  },
});

// Verify mail configuration state on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email SMTP Config Error:", error.message);
  } else {
    console.log("🚀 Email Transporter is ready to send messages");
  }
});

/*
=================================
OTP CACHE & MANAGED CLEANUP
=================================
*/
const otpCache = {};

// Periodic cleanup sweep to prevent memory leaks (runs every 10 minutes)
setInterval(
  () => {
    const now = Date.now();
    Object.keys(otpCache).forEach((email) => {
      if (now > otpCache[email].expiresAt) {
        delete otpCache[email];
      }
    });
  },
  10 * 60 * 1000,
);

/*
=================================
API ROUTES
=================================
*/

// Health Check
app.get("/", (req, res) => {
  res.status(200).send("Backend Server Running & Healthy...");
});

/**
 * API: SEND OTP
 * Generates and dispatches a verification token
 */
app.post("/api/send-otp", async (req, res) => {
  try {
    let { email } = req.body;
    email = email?.trim().toLowerCase();

    console.log(`\n============================`);
    console.log(`📩 Received OTP Request for: "${email}"`);

    if (!email) {
      console.log("⚠️ Aborting: No email provided in request body.");
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    // 1. Check if user already exists
    console.log("🔍 Checking database for existing registration...");
    const [existingUsers] = await db.query(
      "SELECT id FROM employees WHERE email = ?",
      [email],
    );

    if (existingUsers && existingUsers.length > 0) {
      console.log(`⚠️ Aborting: "${email}" is already registered in the DB.`);
      return res.status(400).json({
        success: false,
        message: "This email is already registered to an employee account.",
      });
    }

    // 2. Generate 6-digit verification code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`🎲 Generated temporary OTP: ${generatedOtp}`);

    // 3. Cache the OTP with a strict 5-minute expiration window
    otpCache[email] = {
      otp: generatedOtp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };

    // 4. Construct Mail options (Fixed delivery filtering vulnerability)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Organization Registration Verification Code",
      text: `Welcome to the organization!\n\nYour OTP is: ${generatedOtp}\n\nThis code is valid for 5 minutes. Please do not share this verification code with anyone.`,
    };

    // 5. Send Email
    console.log("⚡ Handoff to Nodemailer sending service initialized...");
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Nodemailer success response:", info.response);
    console.log(`============================\n`);

    return res.status(200).json({
      success: true,
      message: "Verification code sent successfully to your email.",
    });
  } catch (error) {
    console.error("❌ Detailed OTP Transmission Failure:", error);
    console.log(`============================\n`);
    return res.status(500).json({
      success: false,
      message: "Failed to transmit verification code email.",
      error: error.message,
    });
  }
});

/**
 * API: VERIFY OTP
 * Validates the issued registration token against the cache
 */
app.post("/api/verify-otp", (req, res) => {
  let { email, otp } = req.body;
  email = email?.trim().toLowerCase();
  otp = otp?.trim();

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email and OTP are required" });
  }

  const record = otpCache[email];

  if (!record) {
    return res.status(400).json({
      success: false,
      message: "No active verification request found for this email.",
    });
  }

  // Check Expiration
  if (Date.now() > record.expiresAt) {
    delete otpCache[email];
    return res.status(400).json({
      success: false,
      message: "Verification session has expired. Please request a new code.",
    });
  }

  // Cross reference input code with cached token
  if (record.otp === otp) {
    delete otpCache[email]; // Instantly purge token after successful use
    return res.status(200).json({
      success: true,
      message: "Email identity verified successfully.",
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Invalid verification code." });
  }
});

/**
 * API: SIGNUP
 * Finalizes account registration with encrypted credential storage
 */
app.post("/api/signup", async (req, res) => {
  try {
    let { employeeId, fullName, email, contactNumber, password } = req.body;

    employeeId = employeeId?.trim();
    fullName = fullName?.trim();
    email = email?.trim().toLowerCase();
    contactNumber = contactNumber?.trim();

    if (!employeeId || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required registration fields.",
      });
    }

    // Check for existing records
    const [matchingUsers] = await db.query(
      "SELECT id FROM employees WHERE email = ? OR employee_id = ?",
      [email, employeeId],
    );

    if (matchingUsers && matchingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "An account with this Email or Employee ID already exists.",
      });
    }

    // Hash user passwords using a secure work-factor weight of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO employees 
       (employee_id, full_name, email, contact_number, password_hash, is_email_verified) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        employeeId,
        fullName,
        email,
        contactNumber || null,
        hashedPassword,
        true,
      ],
    );

    return res.status(201).json({
      success: true,
      message: "Employee account registered successfully.",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("❌ Account Creation Failure:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error occurred during signup process.",
      error: error.message,
    });
  }
});

/**
 * API: LOGIN
 * Validates employee credentials against secure record stores
 */
app.post("/api/login", async (req, res) => {
  try {
    let { employeeId, password } = req.body;
    employeeId = employeeId?.trim();

    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Employee ID and password credentials are required.",
      });
    }

    const [usersList] = await db.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [employeeId],
    );

    if (!usersList || usersList.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Employee ID or password details.",
      });
    }

    const employee = usersList[0];

    if (!employee.is_email_verified) {
      return res.status(403).json({
        success: false,
        message: "Access blocked. Please verify your email identity first.",
      });
    }

    // Verify Password match
    const validPassword = await bcrypt.compare(
      password,
      employee.password_hash,
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Employee ID or password details.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sign-in authorization successful.",
      user: {
        id: employee.id,
        employeeId: employee.employee_id,
        fullName: employee.full_name,
        email: employee.email,
        contactNumber: employee.contact_number,
      },
    });
  } catch (error) {
    console.error("❌ Login Failure:", error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error occurred during credential authentication.",
      error: error.message,
    });
  }
});

/*
=================================
SERVER BOOT
=================================
*/
app.listen(PORT, () => {
  console.log(
    `📡 Backend cluster is running operational tracks on port: ${PORT}`,
  );
});
