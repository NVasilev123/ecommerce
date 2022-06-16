const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const Product = require("../models/Product");

//create product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const product = new Product({
    title: req.body.title,
    desc: req.body.desc,
    image: req.body.image,
    categories: req.body.categories,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price,
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Product deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get product
router.get("/find/:id", async (req, res) => {
  try {
    const getProduct = await Product.findById({ _id: req.params.id });

    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all products
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let products;

    if (queryNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
