import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useSuperheroStore = create((set, get) => ({
  superheroes: [],
  loading: false,
  error: null,
  currentSuperhero: null,

  addSuperhero: async (formData) => {
    set({ loading: true, error: null });
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/superheroes`,
        formData
      );
      toast.success("Superhero added successfully");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      set({ error: error.message });
      toast.error("Error adding superhero");
    } finally {
      set({ loading: false });
    }
  },

  getAllSuperheroes: async (searchQuery) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/superheroes?${searchQuery}`
      );
      set({ superheroes: res.data.superheroes });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
