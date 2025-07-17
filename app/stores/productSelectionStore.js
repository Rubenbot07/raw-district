import { create } from 'zustand';

export const useProductSelectionStore = create((set) => ({
  selectedSize: null,
  setSelectedSize: (size) => set({ selectedSize: size }),
}));

