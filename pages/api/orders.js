import mongoose from "mongoose";
import mongooseConnect from "@/lib/mongoose";
import Order from "@/models/Order";
import { Product } from "@/models/Product";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export default async function handler(req, res) {
  await mongooseConnect();

  if (req.method === "GET") {
    const email = normalizeEmail(req.query.email);

    if (!email) {
      return res.status(400).json({ message: "Email nije prosledjen." });
    }

    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  }

  if (req.method === "POST") {
    const {
      name,
      email,
      phoneNumber,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts,
    } = req.body || {};

    if (!name || !email || !phoneNumber || !city || !postalCode || !streetAddress) {
      return res.status(400).json({ message: "Nedostaju podaci za porudžbinu." });
    }

    if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
      return res.status(400).json({ message: "Korpa je prazna." });
    }

    const detailedProducts = [];
    const stockUpdates = [];
    let total = 0;

    for (const item of cartProducts) {
      const quantity = Number(item?.quantity);
      const productId = item?.productId;

      if (!productId || !mongoose.Types.ObjectId.isValid(productId) || !Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Nevalidni podaci o proizvodu." });
      }

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Jedan proizvod vise nije dostupan." });
      }

      const stock = Number(product.stock);

      if (Number.isFinite(stock) && stock < quantity) {
        return res.status(409).json({
          message: `Nema dovoljno proizvoda na stanju: ${product.title}.`,
        });
      }

      detailedProducts.push({
        productId: product._id.toString(),
        name: product.title,
        price: product.price,
        quantity,
      });
      stockUpdates.push({ productId: product._id, quantity });
      total += product.price * quantity;
    }

    const decrementedProducts = [];

    try {
      for (const update of stockUpdates) {
        const result = await Product.updateOne(
          { _id: update.productId, stock: { $gte: update.quantity } },
          { $inc: { stock: -update.quantity } }
        );

        if (result.modifiedCount !== 1) {
          throw new Error("INSUFFICIENT_STOCK");
        }

        decrementedProducts.push(update);
      }

      const order = await Order.create({
        name,
        email: normalizeEmail(email),
        phoneNumber,
        city,
        postalCode,
        streetAddress,
        country: country || "Srbija",
        products: detailedProducts,
        total,
        status: "pending",
        createdAt: new Date(),
      });

      return res.status(201).json({ success: true, orderId: order._id });
    } catch (error) {
      await Promise.all(
        decrementedProducts.map((update) =>
          Product.updateOne(
            { _id: update.productId },
            { $inc: { stock: update.quantity } }
          )
        )
      );

      if (error.message === "INSUFFICIENT_STOCK") {
        return res.status(409).json({ message: "Nema dovoljno proizvoda na stanju." });
      }

      throw error;
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
