const GS = 7.93;

interface IPrice {
  [index: string]: {
    name: string;
    price: {
      [priceIndex: number]: number;
    };
  };
}

const priceInfo: IPrice = {
  B: {
    name: "2B",
    price: { 0.8: 189, 1: 227, 1.2: 267, 1.5: 326, 2: 428 },
  },
  HL: {
    name: "H/L",
    price: { 0.8: 210, 1: 249, 1.2: 293, 1.5: 368, 2: 480 },
  },
  MIRROR: {
    name: "Mirror",
    price: { 1: 288, 1.2: 335, 1.5: 407, 2: 530 },
  },
  BLACK_HL: {
    name: "Black H/L",
    price: { 1.2: 563 },
  },
  GOLD_HL: {
    name: "Gold H/L",
    price: { 1.2: 597 },
  },
  GOLD_MIRROR: {
    name: "Gold Mirror",
    price: { 1.2: 597 },
  },
};

const adminInfo = {
  B: {
    name: "2B",
    price: { 0.8: 59, 1: 73, 1.2: 86, 1.5: 105, 2: 138 },
  },
  HL: {
    name: "H/L",
    price: { 0.8: 60, 1: 73, 1.2: 86, 1.5: 105, 2: 137 },
  },
  Mir: {
    name: "Mirror",
    price: { 1: 80, 1.2: 93, 1.5: 113, 2: 147 },
  },
  BLK_H: {
    name: "Black H/L",
    price: { 1.2: 148 },
  },
  GOL_H: {
    name: "Gold H/L",
    price: { 1.2: 157 },
  },
  GOL_M: {
    name: "Gold Mirror",
    price: { 1.2: 157 },
  },
};

interface IMaterial {
  type: string;
  unitPrice: number;
  thick: number;
  quantity: number;
  width: number;
  height: number;
  area: number;
  weight: number;
  plateCost: number;
  foundCost: number;
  price: number;
}

class Material {
  type: string;
  unitPrice: number;
  thick: number;
  quantity: number;
  width: number;
  height: number;
  area: number;
  weight: number;
  plateCost: number;
  foundCost: number;
  price: number;

  constructor(
    type: string,
    thick: number,
    quantity: number,
    width: number,
    height: number
  ) {
    this.type = priceInfo[type].name;
    this.unitPrice = priceInfo[type].price[thick];
    this.thick = thick;
    this.quantity = quantity;
    this.width = width;
    this.height = height;
    this.plateCost = 1000;
    this.foundCost = 0;
    this.area = 0;
    this.price = 0;
    this.weight = 0;
    this.setPrice();
  }
  setPrice() {
    this.area =
      (Math.ceil(this.width / 50) * 50 * (Math.ceil(this.height / 50) * 50)) /
      2500;
    const result = Math.ceil((this.unitPrice * this.area) / 100) * 100;
    if (result > 1000) {
      this.plateCost = result;
    }
    if (this.plateCost < 10000) {
      this.foundCost = 1000;
    }
    this.weight = (this.width * this.height * this.thick * GS) / 1000000;
    this.price = (this.plateCost + this.foundCost) * this.quantity;
  }
}

export const calcMaterial = (
  type: any,
  thick: number,
  quantity: number,
  width: number,
  height: number
) => {
  const material = new Material(type, thick, quantity, width, height);
  material.setPrice();
  return material;
};
