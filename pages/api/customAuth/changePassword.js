import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, email: fallbackEmail, currentPassword, newPassword } = req.body || {};

  if (!token || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Nedostaju podaci za promenu lozinke." });
  }

  try {
    let decoded = null;

    try {
      decoded = process.env.JWT_SECRET ? jwt.verify(token, process.env.JWT_SECRET) : null;
    } catch {
      decoded = jwt.decode(token);
    }

    const email = normalizeEmail(decoded?.email || fallbackEmail);

    if (!email) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const mongoose = await connectToDatabase();
    const users = mongoose.connection.collection("users");
    const user = await users.findOne({ email });

    if (!user?.password) {
      return res.status(404).json({ error: "Korisnik nije pronađen." });
    }

    const passwordMatches = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ error: "Trenutna lozinka nije tačna." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await users.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Greška prilikom promene lozinke:", error);
    return res.status(500).json({ error: "Greška na serveru." });
  }
}
