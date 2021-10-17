const type = document.getElementById("type");
const thick = document.getElementById("thickness");
const quantity = document.getElementById("quantity");
const width = document.querySelector(".js_Width");
const height = document.querySelector(".js_Height");
const btn = document.querySelector(".js_Btn");

const GS = 7.93;
const materialList = [];

class Material {
  constructor(type, thick, quantity, width, height) {
    this.type = priceInfo[type].name;
    this.unitPrice = priceInfo[type].price[thick];
    this.thick = parseFloat(thick);
    this.quantity = parseInt(quantity);
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.area = null;
    this.weight = null;
    this.plateCost = 1000;
    this.foundCost = 0;
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

const priceInfo = {
  "2B": {
    name: "2B",
    price: { 0.8: 189, 1: 227, 1.2: 267, 1.5: 326, 2: 428 },
  },
  HL: {
    name: "H/L",
    price: { 0.8: 210, 1: 249, 1.2: 293, 1.5: 368, 2: 480 },
  },
  Mir: {
    name: "Mirror",
    price: { 1: 288, 1.2: 335, 1.5: 407, 2: 530 },
  },
  BLK_H: {
    name: "Black H/L",
    price: { 1.2: 563 },
  },
  GOL_H: {
    name: "Gold H/L",
    price: { 1.2: 597 },
  },
  GOL_M: {
    name: "Gold Mirror",
    price: { 1.2: 597 },
  },
};

const adminInfo = {
  "2B": {
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

const changeOptions = () => {
  for (let index = 1; index <= 5; index++) {
    thick[index].removeAttribute("disabled");
  }
  switch (type.value) {
    case "Mir":
      thick[1].setAttribute("disabled", "");
      thick[2].setAttribute("selected", "");
      break;
    case "BLK_H":
    case "GOL_H":
    case "GOL_M":
      for (let index = 1; index <= 5; index++) {
        if (index == 3) {
          thick[3].setAttribute("selected", "");
          continue;
        }
        thick[index].setAttribute("disabled", "");
      }
      break;
  }
};

const handleTypeChange = () => {
  changeOptions();
};

const createMaterial = () => {
  if (
    type.value &&
    thick.value &&
    quantity.value > 0 &&
    width.value >= 50 &&
    width.value <= 1219 &&
    height.value >= 50 &&
    height.value <= 2438
  ) {
    const material = new Material(
      type.value,
      thick.value,
      quantity.value,
      width.value,
      height.value
    );
    material.setPrice();
    materialList.push(material);
  } else {
    alert("뭔가 조금 이상하군요");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  createMaterial();
  printResult();
};

const printResult = () => {
  if (materialList.length) {
    console.dir(materialList[0]);
  }
};

const init = () => {
  btn.addEventListener("click", handleSubmit);
  type.addEventListener("change", handleTypeChange);
};

init();
