import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';
import { Product } from '@/models/Product';
import Order from '@/models/Order';

export default async function handler(req, res) {
  try {
    await connectToDatabase();
    console.log("Povezano sa bazom");

    if (req.method === 'GET') {
      const { email } = req.query;
    
      if (!email) {
        return res.status(400).json({ message: "Email nije prosleđen." });
      }
    
      try {
        const orders = await Order.find({ email }).sort({ createdAt: -1 });
        return res.status(200).json({ orders });
      } catch (error) {
        console.error("Greška prilikom dobijanja porudžbina:", error);
        return res.status(500).json({ message: "Greška na serveru." });
      }
    }
    
    
    if (req.method === 'POST') {
      const { name, email, phoneNumber, city, postalCode, streetAddress, country, cartProducts } = req.body;

      console.log("Primljeni cartProducts:", cartProducts);

      if (!Array.isArray(cartProducts) || cartProducts.length === 0) {
        return res.status(400).json({ message: "Nevalidni podaci o korpi." });
      }

      const detailedProducts = await Promise.all(
        cartProducts.map(async (product) => {
          if (!product?.productId || !mongoose.Types.ObjectId.isValid(product.productId)) {
            console.error(`Nevalidan ili prazan productId: ${product?.productId}`);
            return { name: "Nepoznat proizvod", quantity: product?.quantity || 0 };
          }

          console.log("Tražim proizvod sa ID-om:", product.productId);
          const productDetails = await Product.findById(product.productId);
          if (!productDetails) {
            console.error(`Proizvod sa ID-om ${product.productId} nije pronađen.`);
            return { name: "Nepoznat proizvod", quantity: product.quantity };
          }

          return {
            name: productDetails.title,
            quantity: product.quantity,
          };
        })
      );

      // Izračunavanje ukupnog iznosa
      const totalPrice = detailedProducts.reduce(async (totalPromise, product) => {
        const total = await totalPromise;
        const productDetails = await Product.findById(product.productId);
        if (!productDetails) {
            return total; // Ako proizvod nije pronađen, preskoči ga
        }
        return total + (productDetails.price * product.quantity);
    }, Promise.resolve(0));
    
    // Kreiranje nove narudžbine sa ukupnom cenom
    const newOrder = await Order.create({
        name,
        email,
        phoneNumber,
        city,
        postalCode,
        streetAddress,
        country,
        products: detailedProducts,
        status: 'pending',
        total: await totalPrice,
        createdAt: new Date(),
    });

      res.status(201).json({ success: true, orderId: newOrder._id });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Greška prilikom obrade narudžbine:', error);
    res.status(500).json({ success: false, message: 'Greška na serveru' });
  }
}
