import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

const BACKEND_API_BASE = "https://promaja-shop.vercel.app";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getEmailFromValidationResponse(data) {
  return normalizeEmail(
    data?.email ||
      data?.user?.email ||
      data?.decoded?.email ||
      data?.payload?.email
  );
}

async function validateTokenWithBackend(token) {
  try {
    const response = await fetch(`${BACKEND_API_BASE}/api/customAuth/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      return "";
    }

    const data = await response.json();
    return getEmailFromValidationResponse(data);
  } catch (error) {
    console.error("Backend token validation failed:", error);
    return "";
  }
}

async function changePasswordWithBackend({ token, currentPassword, newPassword }) {
  try {
    const response = await fetch(`${BACKEND_API_BASE}/api/customAuth/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token, currentPassword, newPassword }),
    });

    let data = {};

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    return {
      ok: response.ok,
      status: response.status,
      error: data?.error || data?.message || "",
    };
  } catch (error) {
    console.error("Backend password change failed:", error);
    return {
      ok: false,
      status: 0,
      error: "",
    };
  }
}

async function getVerifiedEmailFromToken(token) {
  if (process.env.JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = normalizeEmail(decoded?.email);

      if (email) {
        return email;
      }
    } catch {
      // Token may have been issued by the connected backend API.
    }
  }

  return validateTokenWithBackend(token);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.match(/^Bearer\s+(.+)$/i)?.[1];
  const { token: bodyToken, currentPassword, newPassword } = req.body || {};
  const token = bearerToken || bodyToken;

  if (!token || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Nedostaju podaci za promenu lozinke." });
  }

  if (String(newPassword).length < 6) {
    return res.status(400).json({ error: "Nova lozinka mora imati najmanje 6 karaktera." });
  }

  const email = await getVerifiedEmailFromToken(token);

  if (!email) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const backendResult = await changePasswordWithBackend({
    token,
    currentPassword,
    newPassword,
  });

  if (backendResult.ok) {
    return res.status(200).json({ success: true });
  }

  const backendUserLookupFailed =
    backendResult.status === 404 &&
    /user|korisnik|not found|prona/i.test(backendResult.error);

  if (
    backendResult.status >= 400 &&
    backendResult.status < 500 &&
    !backendUserLookupFailed
  ) {
    return res
      .status(backendResult.status)
      .json({ error: backendResult.error || "Promena lozinke nije uspela." });
  }

  try {
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

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);
    const updateResult = await users.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword, updatedAt: new Date() } }
    );

    if (!updateResult.acknowledged || updateResult.matchedCount !== 1) {
      return res.status(500).json({ error: "Lozinka nije promenjena. Pokušajte ponovo." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Greška prilikom promene lozinke:", error);
    return res.status(500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Greška na serveru."
          : `Greška na serveru: ${error?.message || "nepoznata greška"}`,
    });
  }
}
