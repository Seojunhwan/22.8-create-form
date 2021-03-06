const typeSelectBox = document.getElementById("type"),
  submitBtn = document.querySelector(".submit_btn"),
  optionType = document.querySelector("#type"),
  optionThickness = document.querySelector("#thickness"),
  optionQuantity = document.querySelector("#quantity"),
  optionWidth = document.querySelector(".option_width"),
  optionLength = document.querySelector(".option_length"),
  resultBox = document.querySelector(".js-resultBox"),
  naverList = document.querySelector(".naver_item_list"),
  admin = document.querySelector("header");

let validationValueCheck = false;

const outputValueContainer = {};
let totalPrice = [];

const adminActive = () => {
  const primeCostDisplay = document.querySelectorAll(".js-admin");
  primeCostDisplay.forEach((primeCost) => {
    primeCost.classList.toggle("hide");
  });
};

const appearResultBox = () => {
  resultBox.classList.replace("hide", "active");
};

const hideOptions = () => {
  const thicknessList = document.querySelector("#thickness");
  thicknessList[1].classList.remove("hide-option");
  thicknessList[2].classList.remove("hide-option");
  thicknessList[3].classList.remove("hide-option");
  thicknessList[4].classList.remove("hide-option");
  thicknessList[5].classList.remove("hide-option");
  if (inputValueSet().type === "Mirror") {
    thicknessList[1].classList.add("hide-option");
    thicknessList[1].classList.add("hide-option");
  } else if (
    inputValueSet().type === "BLK_HL" ||
    inputValueSet().type === "GOL_HL" ||
    inputValueSet().type === "GOL_Mirror"
  ) {
    thicknessList[1].classList.add("hide-option");
    thicknessList[2].classList.add("hide-option");
    thicknessList[4].classList.add("hide-option");
    thicknessList[5].classList.add("hide-option");
  }
};

const inputValueSet = () => {
  const inputValueContainer = {
    type: optionType.value,
    thickness: parseFloat(optionThickness.value),
    quantity: parseInt(optionQuantity.value),
    width: parseFloat(optionWidth.value),
    length: parseFloat(optionLength.value),
  };
  return inputValueContainer;
};

const calcValue = (value) => {
  const unitPrice = () => {
    if (value.type === "2B") {
      if (value.thickness == 0.8) {
        return 189;
      }
      if (value.thickness == 1) {
        return 227;
      }
      if (value.thickness == 1.2) {
        return 267;
      }
      if (value.thickness == 1.5) {
        return 326;
      }
      if (value.thickness == 2) {
        return 428;
      }
    }
    if (value.type === "HL") {
      if (value.thickness == 0.8) {
        return 210;
      }
      if (value.thickness == 1) {
        return 249;
      }
      if (value.thickness == 1.2) {
        return 293;
      }
      if (value.thickness == 1.5) {
        return 368;
      }
      if (value.thickness == 2) {
        return 480;
      }
    }
    if (value.type === "Mirror") {
      if (value.thickness == 1) {
        return 288;
      }
      if (value.thickness == 1.2) {
        return 335;
      }
      if (value.thickness == 1.5) {
        return 407;
      }
      if (value.thickness == 2) {
        return 530;
      }
    }
    if (value.type === "BLK_HL") {
      return 563;
    }
    if (value.type === "GOL_HL" || value.type === "GOL_Mirror") {
      return 597;
    }
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
  const calcSize = () => {
    const calcWidth = Math.ceil(value.width / 50) * 50;
    const calcLength = Math.ceil(value.length / 50) * 50;
    const calcResult = (calcWidth * calcLength) / 2500;
    return calcResult;
  };
  const calcPlateCost = () => {
    const result = Math.ceil((unitPrice() * calcSize()) / 100) * 100;
    if (result < 1000) {
      return 1000;
    } else {
      return result;
    }
  };
  const calcPrimeCost = () => {
    return primeCost() * calcSize();
  };
  calcPrimeCost();
  const calcFoundationCost = () => {
    if (calcPlateCost() < 10000) {
      return 1000;
    } else {
      return 0;
    }
  };
  const calcPrice = (calcPlateCost() + calcFoundationCost()) * value.quantity;
  const calcNaverQuantity = calcPrice / 100;
  outputValueContainer.price = calcPrice;
  outputValueContainer.plateCost = calcPlateCost();
  outputValueContainer.foundationCost = calcFoundationCost();
  outputValueContainer.quantity = value.quantity;
  outputValueContainer.naverQuantity = calcNaverQuantity;
  outputValueContainer.primeCost = calcPrimeCost();
};

const appendValue = (output) => {
  const resultList = document.querySelectorAll(".result");
  const naverProductInfo = document.querySelector(".js-naver-product__info");
  const naverQuantityResult = document.querySelector(".js-quantity");
  const naverPriceResult = document.querySelector(".js-naverPrice");
  resultList[0].innerText = `고객님께서 선택해주신 옵션은 ${output.price} 원 입니다.`;
  resultList[1].innerText = `판재비 ${output.plateCost} 원 + 재단비 ${output.foundationCost} 원 X ${output.quantity} 개`;
  resultList[2].innerHTML = `하기와 같이 네이버 스토어 구매 수량에 ${output.naverQuantity}개 입력해 주시기 바랍니다.`;

  // FIXME:리스트 형식으로 바꿔서 필요 없는 코드
  // naverProductInfo.innerText = `${inputValueSet().width} / ${
  //   inputValueSet().length
  // } / ${inputValueSet().type} / ${inputValueSet().thickness} T`;
  // naverQuantityResult.innerText = output.naverQuantity;
  // naverPriceResult.innerText = `${output.price} 원`;
};

const appendOptions = (output) => {
  const naverItem = document.createElement("li");
  const naverBox = document.createElement("div");
  const naverBoxOption = document.createElement("div");
  const product__info = document.createElement("div");
  const admin = document.createElement("div");

  naverItem.className = "naver_item";
  naverBox.className = "naver_box";
  naverBoxOption.className = "naver_box--option";
  product__info.className = "js-naver-product__info";
  admin.className = "hide js-admin";
  // admin.className = "js-admin";

  product__info.innerText = `${inputValueSet().width} * ${
    inputValueSet().length
  } / ${inputValueSet().quantity} / ${inputValueSet().type} ${
    inputValueSet().thickness
  } T`;
  admin.innerText = `${output.primeCost}`;

  const naverBoxAdjustment = document.createElement("div");
  const adjustQuantity = document.createElement("div");
  const operMinus = document.createElement("div");
  const operPlus = document.createElement("div");
  const quantity = document.createElement("div");
  const naverBoxPrice = document.createElement("div");
  const naverBoxPriceSpan = document.createElement("span");

  naverBoxAdjustment.className = "naver_box--adjustment";
  adjustQuantity.className = "adjust--quantity";
  operMinus.className = "operator";
  operPlus.className = "operator";
  quantity.className = "quantity";
  naverBoxPrice.className = "naver-box--price";
  naverBoxPriceSpan.className = "naver-box--price-value";

  quantity.innerText = output.naverQuantity;
  naverBoxPriceSpan.innerText = `${output.price} 원`;

  adjustQuantity.appendChild(operMinus);
  adjustQuantity.appendChild(quantity);
  adjustQuantity.appendChild(operPlus);

  naverBoxOption.appendChild(product__info);
  naverBoxOption.appendChild(admin);
  naverBox.appendChild(naverBoxOption);
  naverItem.appendChild(naverBox);
  naverList.appendChild(naverItem);

  naverBoxPrice.appendChild(naverBoxPriceSpan);
  naverBoxAdjustment.appendChild(adjustQuantity);
  naverBoxAdjustment.appendChild(naverBoxPrice);
  naverBox.appendChild(naverBoxAdjustment);
};

const validationValue = () => {
  if (
    optionType.value === "a" ||
    optionThickness.value === "a" ||
    optionQuantity.value === "" ||
    optionWidth.value === "" ||
    optionLength.value === ""
  ) {
    alert("옵션을 선택해 주세요!");
  } else {
    validationValueCheck = true;
  }
};

const resetValue = () => {
  optionType.value = "a";
  optionThickness.value = "a";
  optionQuantity.value = null;
  optionWidth.value = null;
  optionLength.value = null;
  validationValueCheck = false;
  // FIXME:여기 확인 필요
};

const calcTotalPrice = () => {
  const itemPrice = document.querySelectorAll(".naver-box--price-value");
  const naverTotalPrice = document.querySelector(".total-price--value");
  if (itemPrice.length >= 2) {
    itemPrice.forEach((item) => {
      let res = item.innerText.replace(/[^0-9]/g, "");
      totalPrice.push(parseInt(res));
    });
  } else {
    let res = itemPrice[0].innerHTML.replace(/[^0-9]/g, "");
    totalPrice.push(parseInt(res));
  }
  const reducer = (acc, current) => acc + current;
  naverTotalPrice.innerText = `${totalPrice.reduce(reducer)}원`;
  totalPrice = [];
};

const handleSubmit = (event) => {
  validationValue();
  if (validationValueCheck === true) {
    appearResultBox();
    hideOptions();
    calcValue(inputValueSet());
    appendValue(outputValueContainer);
    appendOptions(outputValueContainer);
    validationValueCheck = false;
    calcTotalPrice();
  }
};

const init = () => {
  // admin.addEventListener("dblclick", adminActive);
  typeSelectBox.addEventListener("change", hideOptions);
  submitBtn.addEventListener("click", handleSubmit);
};

init();
