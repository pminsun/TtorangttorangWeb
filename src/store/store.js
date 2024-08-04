import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingStore = create(
  persist(
    (set) => ({
      subject: '',
      setSubject: (value) => set({ subject: value }),
      presentPurpose: '회사 컨퍼런스',
      setPresentPurpose: (value) => set({ presentPurpose: value }),
      endingTxt: '합니다체',
      setEndingTxt: (value) => set({ endingTxt: value }),
      repeat: false,
      setRepeat: (value) => set({ repeat: value }),
    }),
    {
      name: 'settings', // 로컬 스토리지 키
    },
  ),
);

export const useInitialSettingStore = create(
  persist(
    (set) => ({
      initialSubject: '',
      setInitialSubject: (value) => set({ initialSubject: value }),
      initialPresentPurpose: '회사 컨퍼런스',
      setInitialPresentPurpose: (value) => set({ initialPresentPurpose: value }),
      initialEndingTxt: '합니다체',
      setInitialEndingTxt: (value) => set({ initialEndingTxt: value }),
      initialrepeat: false,
      setInitialRepeat: (value) => set({ initialrepeat: value }),
    }),
    {
      name: 'initialSettings', // 로컬 스토리지 키
    },
  ),
);

export const useNextMoveBtnStore = create((set) => ({
  nextMoveBtn: false,
  setNextMoveBtn: (value) => set({ nextMoveBtn: value }),
}));

export const useFinalScriptStore = create((set) => ({
  finalScript: '',
  setFinalScript: (value) => set({ finalScript: value }),
}));

// Loading
export const useScriptLoadingStore = create((set) => ({
  scriptLoading: false,
  setScriptLoading: (value) => set({ scriptLoading: value }),
}));
export const useQaLoadingStore = create((set) => ({
  qaLoading: false,
  setQaLoading: (value) => set({ qaLoading: value }),
}));
