const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAnAuthorization,
} = require("../middlewares/verifyToken");

const Cart = require("../models/Cart");

//create cart
router.post("/", verifyToken, async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const createdCart = await cart.save();
    res.status(201).json(createdCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update cart
router.put("/:id", verifyTokenAnAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete cart
router.delete("/:id", verifyTokenAnAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Cart deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user cart
router.get("/find/:id", verifyTokenAnAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
