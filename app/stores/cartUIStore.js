import { create } from 'zustand';

export const useCartUIStore = create((set) => ({
  openCart: false,
  openPreCart: false,
  selectedProductSlug: null,

  setOpenCart: (value) => set({ openCart: value }),
  setOpenPreCart: (value) => set({ openPreCart: value }),
  setSelectedProductSlug: (slug) => set({ selectedProductSlug: slug }),
}));