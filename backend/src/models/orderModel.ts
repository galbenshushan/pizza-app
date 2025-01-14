import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  orderTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Received', 'Preparing', 'Ready', 'EnRoute', 'Delivered'],
    required: true,
  },
  subItems: [
    {
      title: { type: String, required: true },
      amount: { type: Number, required: true },
      type: { type: String, required: true },
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
