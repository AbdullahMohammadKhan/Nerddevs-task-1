const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const moment = require("moment");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    //console.log(posts.length);
    const dateP = posts[posts.length - 1].date;
    const timestamp = moment(dateP, "ddd MMM DD YYYY HH:mm:ss GMT Z").diff(
      Date.now(),
      "minutes"
    );
    console.log(timestamp);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  //console.log(req.body);

  const post = await new Post({
    userID: req.body.userID,
    deviceID: req.body.deviceID,
    queryText: req.body.queryText,
  });

  try {
    // console.log(posts[posts.length - 1].date);

    const posts = await Post.find();

    if (posts.length > 0) {
      const dateP = posts[posts.length - 1].date;
      const timestamp = moment(dateP, "ddd MMM DD YYYY HH:mm:ss GMT Z").diff(
        Date.now(),
        "minutes"
      );
      if (Math.abs(timestamp) <= 30) {
        res.status(409).json({
          messsage:
            " You have already placed a support ticket. Please wait at least one hour before sending another request",
        });
      } else {
        const savedPost = await post.save();
        res.status(200).json({
          message: `data:{"_id":$(savedPost._id)}`,
        });
      }
    } else {
      const savedPost = await post.save();
      res.status(200).json({
        message: "data:{" + "_id: " + savedPost._id + "}",
      });
      //console.log(savedPost);
    }
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

module.exports = router;
