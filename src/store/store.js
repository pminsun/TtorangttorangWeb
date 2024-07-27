import { create } from 'zustand';

export const dateEndStore = create((set) => ({
  originScript: '',
  setOriginScript: (origin) => set({ originScript: origin }),
}));
