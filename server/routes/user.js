const router = require("express").Router();
const {
  verifyTokenAnAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");
const cryptojs = require("crypto-js");
const User = require("../models/User");

//update
router.put("/:id", verifyTokenAnAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptojs.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body, //take everthing inside and set it to the user
      },
      { new: true } //new here is to return updated user otherwise it will return the old one
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/:id", verifyTokenAnAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const getUser = await User.findById({ _id: req.params.id });

    const { password, ...others } = getUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const getUsers = query
      ? await User.find().sort({ _id: -1 }).limit(5) //sort by _id backwards and give me only 5
      : await User.find({});

    res.status(200).json(getUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, //match my condition
      {
        $project: {
          month: { $month: "$createdAt" }, //take the month number from createdAt
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }, //group them by number of users
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
