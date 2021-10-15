const type = document.getElementById("type");

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
    price: [189, 227, 267, 326, 428],
  },
  HL: {
    name: "H/L",
    price: [210, 249, 293, 368, 480],
  },
  Mir: {
    name: "Mirror",
    price: [288, 335, 407, 530],
  },
  BLK_HL: {
    name: "Black H/L",
    price: [563],
  },
  GOL_H: {
    name: "Gold H/L",
    price: [597],
  },
  GOL_M: {
    name: "Gold Mirror",
    price: [597],
  },
};

const mate = new Material();
console.log(mate);

const unitPrice = (type, thick) => {
  console.log(type, thick);
  console.log(priceInfo["2B"]);
  switch (type) {
    case "2B":
      switch (thick) {
        case 0.8:
          mate.thick = priceInfo.B.price[0];
        case 1:
          mate.thick = priceInfo.B.price[1];
        case 1.2:
          mate.thick = priceInfo.B.price[2];
        case 1.5:
          mate.thick = priceInfo.B.price[3];
        case 2:
          mate.thick = priceInfo.B.price[4];
        default:
          mate.thick = "Thick_Error";
      }
      break;
    case "HL":
      switch (thick) {
        case 0.8:
          mate.thick = priceInfo.HL.price[0];
        case 1:
          mate.thick = priceInfo.HL.price[1];
        case 1.2:
          mate.thick = priceInfo.HL.price[2];
        case 1.5:
          mate.thick = priceInfo.HL.price[3];
        case 2:
          mate.thick = priceInfo.HL.price[4];
        default:
          mate.thick = "Thick_Error";
      }
      break;
    case "Mir":
      switch (thick) {
        case 1:
          mate.thick = priceInfo.Mir.price[1];
        case 1.2:
          mate.thick = priceInfo.Mir.price[2];
        case 1.5:
          mate.thick = priceInfo.Mir.price[3];
        case 2:
          mate.thick = priceInfo.Mir.price[4];
        default:
          mate.thick = "Thick_Error";
      }
      break;
    case "BLK_HL":
      switch (thick) {
        case 0.8:
          mate.thick = priceInfo.BLK_HL.price[0];
        default:
          mate.thick = "Thick_Error";
      }
      break;
    case "GOL_HL":
      break;
    case "GOL_Mir":
      break;
    default:
      break;
  }
  console.log(mate);
};
const primeCost = () => {
  if (value.type === "2B") {
    if (value.thickness == 0.8) {
      return 59;
    }
    if (value.thickness == 1) {
      return 73;
    }
    if (value.thickness == 1.2) {
      return 86;
    }
    if (value.thickness == 1.5) {
      return 105;
    }
    if (value.thickness == 2) {
      return 138;
    }
  }
  if (value.type === "HL") {
    if (value.thickness == 0.8) {
      return 60;
    }
    if (value.thickness == 1) {
      return 73;
    }
    if (value.thickness == 1.2) {
      return 86;
    }
    if (value.thickness == 1.5) {
      return 105;
    }
    if (value.thickness == 2) {
      return 137;
    }
  }
  if (value.type === "Mirror") {
    if (value.thickness == 1) {
      return 80;
    }
    if (value.thickness == 1.2) {
      return 93;
    }
    if (value.thickness == 1.5) {
      return 113;
    }
    if (value.thickness == 2) {
      return 147;
    }
  }
  if (value.type === "BLK_HL") {
    return 148;
  }
  if (value.type === "GOL_HL" || value.type === "GOL_Mirror") {
    return 157;
  }
};

const handleChange = () => {
  unitPrice(type.value);
};
const init = () => {
  type.addEventListener("change", handleChange);
};

init();
