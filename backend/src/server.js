const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const supabase = require("./lib/supabase");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api/test-db", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.post("/api/register", async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    suffix,
    gender,
    birthdate,
    username,
    email,
    password,
    purok_street,
    barangay,
    city_municipality,
    province,
    valid_id_file,
    proof_of_income_file,
    proof_of_billing_file,
    security_question_1,
    security_answer_1,
    security_question_2,
    security_answer_2,
    security_question_3,
    security_answer_3,
  } = req.body;

  if (!first_name || !middle_name || !last_name || !gender || !birthdate || !username || !email || !password) {
    return res.status(400).json({ error: "Please complete the required account details." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        first_name,
        middle_name,
        last_name,
        suffix: suffix || null,
        gender,
        birthdate,
        username,
        email,
        password: hashedPassword,
        purok_street,
        barangay,
        city_municipality,
        province,
        valid_id_file: valid_id_file || null,
        proof_of_income_file: proof_of_income_file || null,
        proof_of_billing_file: proof_of_billing_file || null,
        security_question_1,
        security_answer_1,
        security_question_2,
        security_answer_2,
        security_question_3,
        security_answer_3,
      },
    ])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Registration successful.",
    user: {
      id: data[0]?.id,
      first_name: data[0]?.first_name,
      email: data[0]?.email,
      username: data[0]?.username,
    },
  });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, first_name, email, username, password")
    .eq("username", username)
    .limit(1);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const user = data[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  res.json({
    message: "Login successful.",
    user: {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      username: user.username,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
