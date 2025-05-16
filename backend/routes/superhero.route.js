import express from "express";

import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
  deleteSuperheroImage,
} from "../controllers/superhero.controller.js";

const router = express.Router();

router.get("/", getAllSuperheroes);
router.get("/:id", getSuperheroById);
router.post("/", createSuperhero);
router.patch("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);
router.delete("/image/:id", deleteSuperheroImage);

export default router;
