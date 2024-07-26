import { create } from 'zustand';

const useStore = create((set) => ({
  originScript: '',
  setOriginScript: (script) => set({ originScript: script }),
  newScript: '',
  setNewScript: (script) => set({ newScript: script }),
  subject: '',
  setSubject: (subject) => set({ subject }),
  presentPurpose: '회사 컨퍼런스',
  setPresentPurpose: (purpose) => set({ presentPurpose: purpose }),
  endingTxt: '합니다체',
  setEndingTxt: (txt) => set({ endingTxt: txt }),
  highlightedText: [],
  setHighlightedText: (texts) => set({ highlightedText: texts }),
  askListState: [false, false, false],
  setAskListState: (state) => set({ askListState: state }),
  askListTotalShow: false,
  setAskListTotalShow: (show) => set({ askListTotalShow: show }),
  showSkeleton: false,
  setShowSkeleton: (show) => set({ showSkeleton: show }),
  showNewSkeleton: false,
  setShowNewSkeleton: (show) => set({ showNewSkeleton: show }),
}));

export default useStore;
