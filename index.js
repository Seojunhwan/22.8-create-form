const type = document.getElementById("type");
const thick = document.getElementById("thickness");
const quantity = document.getElementById("quantity");
const width = document.querySelector(".js_Width");
const height = document.querySelector(".js_Height");
const btn = document.querySelector(".js_Btn");

class Material {
  constructor(type, thick, quantity, width, height) {
    this.type = type;
    this.thick = thick;
    this.quantity = quantity;
    this.width = width;
    this.height = height;
  }
  clear() {
    this.type = "";
    this.thick = 0;
    this.quantity = 0;
    this.width = 0;
    this.height = 0;
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

const currentMaterial = new Material();
console.log(currentMaterial);

const unitPrice = (type, thick, quantity, width, height) => {
  if (type && thick && quantity > 0 && width >= 50 && height >= 50) {
    currentMaterial.type = priceInfo[type].name;
    currentMaterial.thick = priceInfo[type].price[thick];
    currentMaterial.quantity = parseInt(quantity);
    currentMaterial.width = parseInt(width);
    currentMaterial.height = parseInt(height);
  } else {
    alert("뭔가 조금 이상하군요");
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  unitPrice(type.value, thick.value, quantity.value, width.value, height.value);
  console.log(currentMaterial);
  currentMaterial.clear();
  console.log(currentMaterial);
};

const init = () => {
  btn.addEventListener("click", handleSubmit);
};

init();
