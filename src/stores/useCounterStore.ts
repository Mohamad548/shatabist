import { create } from "zustand";

interface CounterStore {
  count: number;
  increase: (maxQuantity: number) => void;
  decrease: () => void;
  setCount: (value: number) => void; // Add setCount function
}

const useCounterStore = create<CounterStore>((set) => ({
  count: 2,
  increase: (maxQuantity) =>
    set((state) => ({
      count: state.count < maxQuantity ? state.count + 1 : state.count,
    })),
  decrease: () =>
    set((state) => ({
      count: state.count > 1 ? state.count - 1 : state.count,
    })),
  setCount: (value) => set({ count: value }), // Implement setCount to directly set the count value
}));

export default useCounterStore;
