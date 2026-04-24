import { create } from "zustand";

export const useDocStore = create((set) => ({
  activeSection: "",
  language: "curl",

  setSection: (id) => set({ activeSection: id }),
  setLanguage: (lang) => set({ language: lang }),
}));
