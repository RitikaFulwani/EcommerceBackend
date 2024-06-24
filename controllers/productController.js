// controllers/productController.js
const { Product } = require('../models');
const path = require('path');
const fs = require('fs');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const imageFilename = req.file ? req.file.filename : null;

    await Product.create({
      name,
      price,
      description,
      stock,
      imageFilename
    });

    res.redirect('/products');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('products/index', { products });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/show', { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.editProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('products/edit', { product });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    const imageFilename = req.file ? req.file.filename : req.body.existingImage;

    const [updated] = await Product.update(
      { name, price, description, stock, imageFilename },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).send('Product not found');
    }

    res.redirect(`/products/${req.params.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Delete the image file from the server
    if (product.imageFilename) {
      const imagePath = path.join(__dirname, '..', 'uploads', product.imageFilename);
      fs.unlinkSync(imagePath);
    }

    await Product.destroy({
      where: { id: req.params.id },
    });

    res.redirect('/products');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
