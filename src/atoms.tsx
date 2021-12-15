import { atom } from "recoil";

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
