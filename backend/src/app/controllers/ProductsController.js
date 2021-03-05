
import Product from '../models/Product';
import fs from 'fs';
import path from 'path';

export default {

  async index(req, res) {
    const products = await Product.find();

    return res.json(products);
  },

  async show(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    return res.json(product);
  },

  async store(req, res) {
    try {
      const { key: photo_name } = req.file;
      const photo_url = `${process.env.URL_APP}/uploads/${photo_name}`;
      
      const product = await Product.create({
        ...req.body,
        photo_name,
        photo_url,
      });

      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOneAndUpdate({ _id: id }, req.body , { new: true });

      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Failed' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);
      const path_photo = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', product.photo_name);

      fs.unlink(path_photo, async (err) => {
        if(err) return res.status(400).json({ error: 'Error deleting the photo' });

        await product.remove();
      });

      return res.json(product);
    } catch (error) {
      return res.status(400).json({ error: 'Failed' });
    }
  },

}