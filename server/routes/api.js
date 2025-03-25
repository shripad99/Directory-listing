const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const ProductCombination = require("../models/ProductCombination");
const Material = require("../models/material");
const Grade = require("../models/Grade");


router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);

router.get('/materials', async (req, res) => {
    try {
        const materials = await Material.find();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/materials', async (req, res) => {
    const material = new Material({
        name: req.body.name
    });

    try {
        const newMaterial = await material.save();
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/grades', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/grades', async (req, res) => {
    const grade = new Grade({
        name: req.body.name
    });

    try {   
        const newGrade = await grade.save();
        res.status(201).json(newGrade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/product-combinations', async (req, res) => {
    try {
        const productCombinations = await ProductCombination.find()
            .populate('productId')
            .populate('materialId')
            .populate('gradeId');
        res.json(productCombinations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/combinations', async (req, res) => {
    try {
      const { productId, materialId, gradeIds } = req.body;
      const product = await Product.findById(productId);
      const material = await Material.findById(materialId);
  
      const combinations = await Promise.all(
        gradeIds.map(async (gradeId) => {
          const grade = await Grade.findById(gradeId);
          const name = `${material.name} ${grade.name} ${product.name}`;
          return new ProductCombination({ productId, materialId, gradeId, name });
        })
      );
  
      await ProductCombination.insertMany(combinations);
      res.status(201).json(combinations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.put('/combinations/:id', async (req, res) => {
    try {
      const { price, shape, length, thickness } = req.body;
      const combination = await ProductCombination.findByIdAndUpdate(
        req.params.id,
        { price, shape, length, thickness },
        { new: true }
      );
      res.json(combination);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.put('/combinations/bulk', async (req, res) => {
    try {
      const { ids, updates } = req.body;
      const result = await ProductCombination.updateMany(
        { _id: { $in: ids } },
        updates,
        { new: true }
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

router.delete('/combinations/:id', async (req, res) => {    
    try {
      await ProductCombination.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product combination deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

module.exports = router;