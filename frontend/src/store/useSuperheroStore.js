import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useSuperheroStore = create((set, get) => ({
  superheroes: [],
  loading: false,
  createLoading: false,
  showMore: false,
  error: null,
  currentSuperhero: null,

  resetCurrentSuperhero: () => set({ currentSuperhero: null }),

  addSuperhero: async (formData) => {
    set({ createLoading: true, error: null });
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/superheroes`,
        formData
      );
      await get().getAllSuperheroes();
      toast.success("Superhero added successfully");
      document.getElementById("add_superhero_modal").close();
    } catch (error) {
      set({ error: error.message });
      toast.error("Error adding superhero");
    } finally {
      set({ createLoading: false });
    }
  },

  editSuperhero: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/superheroes/${id}`,
        formData
      );
      toast.success("Superhero updated successfully");
      await get().getSuperheroById(id);
    } catch (error) {
      set({ error: error.message });
      toast.error("Error updating superhero");
    } finally {
      set({ loading: false });
    }
  },

  deleteImage: async (public_id, superheroId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/superheroes/image/${superheroId}`,
        { data: { public_id } }
      );
      await get().getSuperheroById(superheroId);
      toast.success("Image deleted successfully");
    } catch (error) {
      set({ error: error.message });
      toast.error("Error deleting image");
    } finally {
      set({ loading: false });
    }
  },

  deleteSuperhero: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/superheroes/${id}`
      );
      await get().getAllSuperheroes();
      toast.success("Superhero deleted successfully");
    } catch (error) {
      set({ error: error.message });
      toast.error("Error deleting superhero");
    } finally {
      set({ loading: false });
    }
  },

  getAllSuperheroes: async (searchQuery, append = false) => {
    set({ loading: append ? false : true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/superheroes?${searchQuery}`
      );
      set((state) => ({
        superheroes: append
          ? [...state.superheroes, ...res.data.superheroes]
          : res.data.superheroes,

        showMore:
          res.data.totalSuperheroes >
          (append
            ? state.superheroes.length + res.data.superheroes.length
            : res.data.superheroes.length),
      }));
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  getSuperheroById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/superheroes/${id}`
      );
      set({ currentSuperhero: res.data.superhero });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
