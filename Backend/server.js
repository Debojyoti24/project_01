// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bcrypt = require("bcryptjs");

// dotenv.config();

// const db = require("./db");

// const app = express();
// const PORT = process.env.PORT || 5000;

// /*
// =================================
// MIDDLEWARE
// =================================
// */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     'https://project-01-yr7e.vercel.app'// Vite frontend
//     credentials: true,
//   }),
// );

// app.use(express.json());

// /*
// =================================
// TEST API
// =================================
// */
// app.get("/", (req, res) => {
//   res.send("Backend Running...");
// });

// /*
// =================================
// SIGNUP API
// =================================
// */
// app.post("/api/signup", async (req, res) => {
//   try {
//     let { employeeId, fullName, email, contactNumber, password } = req.body;

//     // Trim inputs
//     employeeId = employeeId?.trim();
//     fullName = fullName?.trim();
//     email = email?.trim();
//     contactNumber = contactNumber?.trim();

//     /*
//     =========================
//     VALIDATION
//     =========================
//     */
//     if (!employeeId || !fullName || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     /*
//     =========================
//     CHECK DUPLICATES
//     =========================
//     */
//     const [existingUser] = await db.query(
//       `
//         SELECT *
//         FROM employees
//         WHERE email = ?
//         OR employee_id = ?
//         `,
//       [email, employeeId],
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Email or Employee ID already exists",
//       });
//     }

//     /*
//     =========================
//     HASH PASSWORD
//     =========================
//     */
//     const hashedPassword = await bcrypt.hash(password, 10);

//     /*
//     =========================
//     INSERT USER
//     =========================
//     */
//     const [result] = await db.query(
//       `
//         INSERT INTO employees
//         (
//           employee_id,
//           full_name,
//           email,
//           contact_number,
//           password_hash,
//           is_email_verified
//         )
//         VALUES (?, ?, ?, ?, ?, ?)
//         `,
//       [
//         employeeId,
//         fullName,
//         email,
//         contactNumber || null,
//         hashedPassword,
//         true, // auto verified after OTP
//       ],
//     );

//     res.status(201).json({
//       success: true,
//       message: "Account created successfully",
//       userId: result.insertId,
//     });
//   } catch (error) {
//     console.error("Signup Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// });

// /*
// =================================
// LOGIN API
// =================================
// */
// app.post("/api/login", async (req, res) => {
//   try {
//     let { employeeId, password } = req.body;

//     employeeId = employeeId?.trim();

//     /*
//     =========================
//     VALIDATION
//     =========================
//     */
//     if (!employeeId || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Enter valid details",
//       });
//     }

//     /*
//     =========================
//     FIND USER
//     =========================
//     */
//     const [user] = await db.query(
//       `
//         SELECT *
//         FROM employees
//         WHERE employee_id = ?
//         `,
//       [employeeId],
//     );

//     /*
//     =========================
//     USER NOT FOUND
//     =========================
//     */
//     if (user.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Enter valid details",
//       });
//     }

//     /*
//     =========================
//     EMAIL NOT VERIFIED
//     =========================
//     */
//     if (!user[0].is_email_verified) {
//       return res.status(403).json({
//         success: false,
//         message: "Email not verified",
//       });
//     }

//     /*
//     =========================
//     PASSWORD CHECK
//     =========================
//     */
//     const validPassword = await bcrypt.compare(password, user[0].password_hash);

//     if (!validPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Enter valid details",
//       });
//     }

//     /*
//     =========================
//     LOGIN SUCCESS
//     =========================
//     */
//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       user: {
//         id: user[0].id,
//         employeeId: user[0].employee_id,
//         fullName: user[0].full_name,
//         email: user[0].email,
//         contactNumber: user[0].contact_number,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// });

// /*
// =================================
// START SERVER
// =================================
// */
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

/*
=================================
MIDDLEWARE
=================================
*/
// Define the list of domains allowed to access this API
const allowedOrigins = [
  "http://localhost:5173",
  "https://project-01-yr7e.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

/*
=================================
TEST API
=================================
*/
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

/*
=================================
SIGNUP API
=================================
*/
app.post("/api/signup", async (req, res) => {
  try {
    let { employeeId, fullName, email, contactNumber, password } = req.body;

    // Trim inputs
    employeeId = employeeId?.trim();
    fullName = fullName?.trim();
    email = email?.trim();
    contactNumber = contactNumber?.trim();

    /*
    =========================
    VALIDATION
    =========================
    */
    if (!employeeId || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    /*
    =========================
    CHECK DUPLICATES
    =========================
    */
    const [existingUser] = await db.query(
      `
        SELECT *
        FROM employees
        WHERE email = ?
        OR employee_id = ?
        `,
      [email, employeeId],
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email or Employee ID already exists",
      });
    }

    /*
    =========================
    HASH PASSWORD
    =========================
    */
    const hashedPassword = await bcrypt.hash(password, 10);

    /*
    =========================
    INSERT USER
    =========================
    */
    const [result] = await db.query(
      `
        INSERT INTO employees
        (
          employee_id,
          full_name,
          email,
          contact_number,
          password_hash,
          is_email_verified
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
      [
        employeeId,
        fullName,
        email,
        contactNumber || null,
        hashedPassword,
        true, // auto verified after OTP
      ],
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

/*
=================================
LOGIN API
=================================
*/
app.post("/api/login", async (req, res) => {
  try {
    let { employeeId, password } = req.body;

    employeeId = employeeId?.trim();

    /*
    =========================
    VALIDATION
    =========================
    */
    if (!employeeId || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter valid details",
      });
    }

    /*
    =========================
    FIND USER
    =========================
    */
    const [user] = await db.query(
      `
        SELECT *
        FROM employees
        WHERE employee_id = ?
        `,
      [employeeId],
    );

    /*
    =========================
    USER NOT FOUND
    =========================
    */
    if (user.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Enter valid details",
      });
    }

    /*
    =========================
    EMAIL NOT VERIFIED
    =========================
    */
    if (!user[0].is_email_verified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified",
      });
    }

    /*
    =========================
    PASSWORD CHECK
    =========================
    */
    const validPassword = await bcrypt.compare(password, user[0].password_hash);

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Enter valid details",
      });
    }

    /*
    =========================
    LOGIN SUCCESS
    =========================
    */
    res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        id: user[0].id,
        employeeId: user[0].get_id,
        fullName: user[0].full_name,
        email: user[0].email,
        contactNumber: user[0].contact_number,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

/*
=================================
START SERVER
=================================
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
