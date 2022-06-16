const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAnAuthorization,
} = require("../middlewares/verifyToken");

const Order = require("../models/Order");

//create order
router.post("/", verifyToken, async (req, res) => {
  const order = new Order(req.body);

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update order
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete order
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("Order deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user orders
router.get("/find/:id", verifyTokenAnAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get monthly income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const current = new Date();
  const lastMonth = new Date(current.setMonth(current.getMonth() - 1));
  const previousMonth = new Date(current.setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
