import { create } from "zustand";

interface ScrollState {
  sectionRefs: Record<string, HTMLElement | null>;
  activeId: string;
  setSectionRef: (id: string, ref: HTMLElement | null) => void;
  scrollToSection: (id: string) => void;
  setActiveId: (id: string) => void;
}

export const useScrollStore = create<ScrollState>((set, get) => ({
  sectionRefs: {
    intro: null,
    info: null,
    review: null,
    question: null,
  },
  activeId: "",
  setSectionRef: (id, ref) =>
    set((state) => ({
      sectionRefs: { ...state.sectionRefs, [id]: ref },
    })),
  setActiveId: (id) => set({ activeId: id }),

  scrollToSection: (id) => {
    const el = get().sectionRefs[id];
    if (el) {
      const yOffset = -80; // فاصله‌ای که می‌خوای بالاتر اسکرول کنه (مثلا 80 پیکسل)
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      get().setActiveId(id); // activeId رو هم آپدیت کن
    }
  },
}));
