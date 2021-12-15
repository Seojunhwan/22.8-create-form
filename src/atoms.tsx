import { atom, selector } from "recoil";

export interface IItem {
  id: number;
  type: string;
  thick: number;
  quantity: number;
  width: number;
  height: number;
  price: number;
}

export const itemsState = atom<IItem[]>({
  key: "item",
  default: [],
});

export const typeState = atom({
  key: "type",
  default: "",
});

export const thickState = atom({
  key: "thick",
  default: "",
});

export const optionState = selector({
  key: "optionSelector",
  get: ({ get }) => {
    const type = get(typeState);
    const thick = get(thickState);
    return [type, thick];
  },
});
