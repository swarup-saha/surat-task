import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const urlCreate = async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  const urlId = nanoid();
  try {
    let url = await Url.findOne({ origUrl });
    if (url) {
      res.status(200).json(url);
    } else {
      const shortUrl = `${base}/${urlId}`;
      url = new Url({
        origUrl,
        shortUrl,
        urlId,
        date: new Date(),
      });
      await url.save();
      res.status(201).json(url);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};
