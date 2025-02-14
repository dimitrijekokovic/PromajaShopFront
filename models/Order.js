import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  streetAddress: { type: String, required: true },
  country: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.Mixed, required: true }],
  status: { type: String, default: 'U toku...' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
