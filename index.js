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
    this.unitPrice = null;
    this.size = null;
    this.plateCost = 1000;
    this.foundCost = 0;
  }
  setPrice() {
    this.size =
      (Math.ceil(this.width / 50) * 50 * (Math.ceil(this.height / 50) * 50)) /
      2500;
    const result = Math.ceil((this.unitPrice * this.size) / 100) * 100;
    if (result > 1000) {
      this.plateCost = result;
    }
    if (this.plateCost < 10000) {
      this.foundCost = 1000;
    }
    this.price = (this.plateCost + this.foundCost) * this.quantity;
  }
  clear() {
    this.type = null;
    this.thick = null;
    this.quantity = null;
    this.width = null;
    this.height = null;
    this.unitPrice = null;
    this.size = null;
    this.plateCost = 1000;
    this.foundCost = 0;
  }
}

const material = new Material();

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

const putMaterialInfo = (type, thick, quantity, width, height) => {
  material.type = priceInfo[type].name;
  material.unitPrice = priceInfo[type].price[thick];
  material.thick = parseFloat(thick);
  material.quantity = parseInt(quantity);
  material.width = parseInt(width);
  material.height = parseInt(height);
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

const printResult = () => {
  // TODO 결과 화면에 표시하는 코드 작성 필요
  // TODO 결과 레이아웃 구성 필요
};

const handleSubmit = (event) => {
  event.preventDefault();
  if (
    type.value &&
    thick.value &&
    quantity.value > 0 &&
    width.value >= 50 &&
    height.value >= 50
  ) {
    putMaterialInfo(
      type.value,
      thick.value,
      quantity.value,
      width.value,
      height.value
    );
  } else {
    alert("뭔가 조금 이상하군요");
    return;
  }
  material.setPrice();
  printResult();
  console.log(material.price);
  console.log(material);
  // material.clear();
};

const init = () => {
  btn.addEventListener("click", handleSubmit);
  type.addEventListener("change", handleTypeChange);
};

init();
