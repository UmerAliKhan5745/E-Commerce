import mongoose from 'mongoose';

// Define a base product schema with common fields
export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  // Add more common fields as needed
});

export const tshirtSchema = new mongoose.Schema({
  size: {
    type: [String],
    required: true
  },
  // Add more specific fields for t-shirts
});

export const mugSchema = new mongoose.Schema({
  capacity: {
    type: String,
    required: true
  },
  // Add more specific fields for mugs
});

export const hoodieSchema = new mongoose.Schema({
  size: {
    type: [String],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  // Add more specific fields for hoodies
});

export const stickerSchema = new mongoose.Schema({
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    unit: { type: String, required: true }
  }
  
  // Add more specific fields for stickers
});

export const Product = mongoose.model('Product', productSchema);
export const Tshirt = Product.discriminator('Tshirt', tshirtSchema);
export const Mug = Product.discriminator('Mug', mugSchema);
export const Hoodie = Product.discriminator('Hoodie', hoodieSchema);
export const Sticker = Product.discriminator('Sticker', stickerSchema);

module.exports = {
  Product,
  Tshirt,
  Mug,
  Hoodie,
  Sticker
};
