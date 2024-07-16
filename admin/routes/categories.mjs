import express from "express";
import { categories, products } from "../constants/index.mjs";

const router = express.Router();

router.get("/categories", (_, res) => {
  res.send(categories);
});

router.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  const matchProducts = products?.filter((item) => item._base === id);

  if (!matchProducts || matchProducts.length === 0) {
    return res
      .status(404)
      .json({ message: "No products match with the category!" });
  }
  res.status(200).json(matchProducts);
});

export default router;
