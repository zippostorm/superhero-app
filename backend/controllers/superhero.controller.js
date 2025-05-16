import cloudinary from "../lib/cloudinary.js";

import { Superhero } from "../models/superhero.model.js";

export const getAllSuperheroes = async (req, res) => {
  try {
    const superheroes = await Superhero.find();
    res.status(200).json({ success: true, superheroes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getAllSuperheroes controller: " + error.message,
    });
  }
};

export const getSuperheroById = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res
        .status(404)
        .json({ success: false, message: "Superhero not found" });
    }
    res.status(200).json({ success: true, superhero });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in getSuperheroById controller: " + error.message,
    });
  }
};

export const createSuperhero = async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = req.body;

    let uploadedImages = [];

    if (images && images.length > 0) {
      for (const img of images) {
        const uploadRes = await cloudinary.uploader.upload(img, {
          folder: "superheroes",
        });
        uploadedImages.push({
          secure_url: uploadRes.secure_url,
          public_id: uploadRes.public_id,
        });
      }
    }

    const superhero = await Superhero.create({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: uploadedImages,
    });
    res.status(201).json({ success: true, superhero });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in createSuperhero controller: " + error.message,
    });
  }
};

export const updateSuperhero = async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
    } = req.body;

    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res
        .status(404)
        .json({ success: false, message: "Superhero not found" });
    }

    superhero.nickname = nickname || superhero.nickname;
    superhero.real_name = real_name || superhero.real_name;
    superhero.origin_description =
      origin_description || superhero.origin_description;
    superhero.superpowers = superpowers || superhero.superpowers;
    superhero.catch_phrase = catch_phrase || superhero.catch_phrase;

    await superhero.save();
    res.status(200).json({ success: true, superhero });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in updateSuperhero controller: " + error.message,
    });
  }
};

export const deleteSuperhero = async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);

    if (!superhero) {
      return res
        .status(404)
        .json({ success: false, message: "Superhero not found" });
    }

    if (superhero.images && superhero.images.length > 0) {
      for (const img of superhero.images) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await superhero.remove();
    res.status(200).json({ success: true, message: "Superhero deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in deleteSuperhero controller: " + error.message,
    });
  }
};
