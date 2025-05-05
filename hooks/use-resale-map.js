"use client";
import { create } from "zustand";

export const useResaleMap = create((set) => ({
  isMapOpen: false,
  setIsMapOpen: (isOpen) => set({ isMapOpen: isOpen }),
}));
