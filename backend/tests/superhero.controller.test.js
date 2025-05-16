import { jest } from "@jest/globals";
import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  deleteSuperheroImage,
  updateSuperhero,
  deleteSuperhero,
} from "../controllers/superhero.controller.js";
import { Superhero } from "../models/superhero.model.js";

jest.mock("../models/superhero.model.js");
jest.mock("../lib/cloudinary.js", () => ({
  uploader: {
    upload: jest
      .fn()
      .mockResolvedValue({ secure_url: "mocked_url", public_id: "mocked_id" }),
    destroy: jest.fn().mockResolvedValue({ result: "ok" }),
  },
}));

describe("Superhero Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getAllSuperheroes", () => {
    it("returns a list of heroes", async () => {
      const mockFindChain = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValue([{ nickname: "Superman" }]),
      };

      Superhero.find.mockReturnValue(mockFindChain);
      Superhero.countDocuments.mockResolvedValue(1);

      req.query = { startIndex: 0, limit: 5 };

      await getAllSuperheroes(req, res);

      expect(Superhero.find).toHaveBeenCalled();
      expect(Superhero.countDocuments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        superheroes: [{ nickname: "Superman" }],
        totalSuperheroes: 1,
      });
    });
  });

  describe("createSuperhero", () => {
    it("create a hero", async () => {
      req.body = {
        nickname: "Batman",
        real_name: "Bruce",
        origin_description: "Rich guy",
        superpowers: "Money",
        catch_phrase: "I'm Batman",
        images: ["base64img"],
      };
      Superhero.create.mockResolvedValue({
        nickname: "Batman",
        images: [{ secure_url: "mocked_url" }],
      });

      await createSuperhero(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          superhero: expect.any(Object),
        })
      );
    });
  });

  describe("updateSuperhero", () => {
    it("update the hero", async () => {
      req.params.id = "123";
      req.body = {
        nickname: "Updated",
        images: ["base64img"],
      };
      const mockHero = {
        nickname: "Old",
        real_name: "Old",
        origin_description: "Old",
        superpowers: "Old",
        catch_phrase: "Old",
        images: [],
        save: jest.fn(),
      };
      Superhero.findById.mockResolvedValue(mockHero);

      await updateSuperhero(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockHero.save).toHaveBeenCalled();
    });
  });

  describe("deleteSuperheroImage", () => {
    it("removes the hero image", async () => {
      req.params.id = "123";
      req.body = { public_id: "mocked_id" };
      const mockHero = {
        images: [{ public_id: "mocked_id" }],
        save: jest.fn(),
      };
      Superhero.findById.mockResolvedValue(mockHero);

      await deleteSuperheroImage(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Image deleted",
      });
    });
  });

  describe("deleteSuperhero", () => {
    it("remove hero", async () => {
      req.params.id = "123";
      const mockHero = {
        images: [{ public_id: "mocked_id" }],
      };
      Superhero.findById.mockResolvedValue(mockHero);
      Superhero.findByIdAndDelete.mockResolvedValue();

      await deleteSuperhero(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Superhero deleted",
      });
    });
  });

  describe("getSuperheroById", () => {
    it("returns hero if found", async () => {
      const mockHero = { _id: "123", nickname: "Superman" };
      req.params.id = "123";
      Superhero.findById.mockResolvedValue(mockHero);

      await getSuperheroById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        superhero: mockHero,
      });
    });
  });
});
