const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Mock database
const users = [{ email: "test@example.com", password: "password123" }];

// Login API
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        return res.json({ success: true, message: "Login Successful" });
    } else {
        return res.json({ success: false, message: "Invalid Credentials" });
    }
});

// Signup API
app.post("/signup", (req, res) => {
    const { email, password } = req.body;

    if (users.find((u) => u.email === email)) {
        return res.json({ success: false, message: "Email already registered" });
    }

    users.push({ email, password });
    return res.json({ success: true, message: "User Registered Successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
