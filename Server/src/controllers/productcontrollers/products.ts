import express from 'express';
import { Tshirt, Mug, Hoodie, Sticker } from '../../models/productSchema';
// Endpoint to save a Tshirt
export const Tshirts = async (req: any, res: any) => {
  try {
    let id = req.params.id;  
    if (id) {
      id = id.replace(/:/g,'');
      const data = await Tshirt.findById(id); // Fetch data from MongoDB using Mongoose
      return res.status(200).json(data);
    }
    if (req.body && Object.keys(req.body).length !== 0) {
      const newTshirt = new Tshirt(req.body);
      await newTshirt.save();
      return res.status(201).send(newTshirt);
    }
    // If neither condition is met, execute this block
    const tshirts = await Tshirt.find();
    res.status(201).send(tshirts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}  
// Endpoint to save a Mug
export const mug = async (req: any, res: any) => {
  try {
    let id = req.params.id;  
    if (id) {
      id = id.replace(/:/g,'');
      const data = await Mug.findById(id); // Fetch data from MongoDB using Mongoose
      return res.status(200).json(data);
    }
    if (req.body && Object.keys(req.body).length !== 0) {
      const newMug = new Mug(req.body);
      await newMug.save();
      return res.status(201).send(newMug);
    }
    // If neither condition is met, execute this block
    const mugs = await Mug.find();
    res.status(201).send(mugs);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

// Endpoint to save a Hoodie
export const hoodie = async (req: any, res: any) => {
  try {
    let id = req.params.id;  
    if (id) {
      id = id.replace(/:/g,'');
      const data = await Hoodie.findById(id); // Fetch data from MongoDB using Mongoose
      return res.status(200).json(data);
    }
    if (req.body && Object.keys(req.body).length !== 0) {
      const newHoodie = new Hoodie(req.body);
      await newHoodie.save();
      return res.status(201).send(newHoodie);
    }
    // If neither condition is met, execute this block
    const hoodies = await Hoodie.find();
    res.status(201).send(hoodies);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

// Endpoint to save a Sticker
export const sticker = async (req: any, res: any) => {
  try {
    let id = req.params.id;  
    if (id) {
      id = id.replace(/:/g,'');
      const data = await Sticker.findById(id); // Fetch data from MongoDB using Mongoose
      return res.status(200).json(data);
    }
    if (req.body && Object.keys(req.body).length !== 0) {
      const newSticker = new Sticker(req.body);
      await newSticker.save();
      return res.status(201).send(newSticker);
    }
    // If neither condition is met, execute this block
    const stickers = await Sticker.find();
    res.status(201).send(stickers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}
