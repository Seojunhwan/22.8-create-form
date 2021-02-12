const typeSelectBox = document.getElementById("type"),
  submitBtn = document.querySelector(".submit_btn"),
  optionType = document.querySelector("#type"),
  optionThickness = document.querySelector("#thickness"),
  optionQuantity = document.querySelector("#quantity"),
  optionWidth = document.querySelector(".option_width"),
  optionLength = document.querySelector(".option_length"),
  resultBox = document.querySelector(".js-resultBox");

const outputValueContainer = {};

function appearResultBox() {
  resultBox.classList.replace("hide", "active");
}

function hideOptions() {
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
}

function inputValueSet() {
  const inputValueContainer = {
    type: optionType.value,
    thickness: parseFloat(optionThickness.value),
    quantity: parseInt(optionQuantity.value),
    width: parseFloat(optionWidth.value),
    length: parseFloat(optionLength.value),
  };
  return inputValueContainer;
}

function calcValue(value) {
  function unitPrice() {
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
  }
  function calcSize() {
    const calcWidth = Math.ceil(value.width / 50) * 50;
    const calcLength = Math.ceil(value.length / 50) * 50;
    const calcResult = (calcWidth * calcLength) / 2500;
    return calcResult;
  }
  function calcPlateCost() {
    const result = Math.ceil((unitPrice() * calcSize()) / 100) * 100;
    if (result < 1000) {
      return 1000;
    } else {
      return result;
    }
  }
  function calcFoundationCost() {
    if (calcPlateCost() < 10000) {
      return 1000;
    } else {
      return 0;
    }
  }
  const calcPrice = (calcPlateCost() + calcFoundationCost()) * value.quantity;
  const calcNaverQuantity = calcPrice / 100;
  outputValueContainer.price = calcPrice;
  outputValueContainer.plateCost = calcPlateCost();
  outputValueContainer.foundationCost = calcFoundationCost();
  outputValueContainer.quantity = value.quantity;
  outputValueContainer.naverQuantity = calcNaverQuantity;
}

function appendValue(output) {
  const resultList = document.querySelectorAll(".result");
  const naverProductInfo = document.querySelector(".js-naver-product__info");
  const naverQuantityResult = document.querySelector(".js-quantity");
  const naverPriceResult = document.querySelector(".js-naverPrice");
  resultList[0].innerText = `고객님께서 선택해주신 옵션은 ${output.price} 원 입니다.`;
  resultList[1].innerText = `판재비 ${output.plateCost} 원 + 재단비 ${output.foundationCost} 원 X ${output.quantity} 개`;
  resultList[2].innerHTML = `하기와 같이 네이버 스토어 구매 수량에 ${output.naverQuantity}개 입력해 주시기 바랍니다.`;
  naverProductInfo.innerText = `${inputValueSet().width} / ${
    inputValueSet().length
  } / ${inputValueSet().type} / ${inputValueSet().thickness} T`;
  naverQuantityResult.innerText = output.naverQuantity;
  naverPriceResult.innerText = `${output.price} 원`;
}

function handleSubmit(event) {
  appearResultBox();
  calcValue(inputValueSet());
  hideOptions();
  appendValue(outputValueContainer);
}

function init() {
  typeSelectBox.addEventListener("change", hideOptions);
  submitBtn.addEventListener("click", handleSubmit);
}

init();
