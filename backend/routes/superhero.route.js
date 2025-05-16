import express from "express";

import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero,
} from "../controllers/superhero.controller.js";

const router = express.Router();

router.get("/", getAllSuperheroes);
router.get("/:id", getSuperheroById);
router.post("/", createSuperhero);
router.patch("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);

export default router;
