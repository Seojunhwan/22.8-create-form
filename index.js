// const selectedType = document.getElementById("type").options[document.getElementById("type")]
const typeSelectBox = document.getElementById("type"),
  thickSelectBox = document.getElementById("thickness"),
  result = document.querySelector(".result"),
  resultPlate = document.querySelector(".plate_cost"),
  resultFoundation = document.querySelector(".foundation_cost"),
  resultQuantity = document.querySelector(".result_quantity"),
  naverInfo = document.querySelector(".count_info"),
  submitBtn = document.querySelector(".submit_btn"),
  quantity = document.querySelector("#quantity"),
  naverBoxInfo = document.querySelector(".js-naverBox"),
  naverBoxQuantity = document.querySelector(".js-quantity"),
  naverBoxPrice = document.querySelector(".js-naverPrice"),
  box = document.getElementsByTagName("select"),
  box2 = document.getElementsByTagName("input");

function initialOption() {
  const options = document.querySelectorAll("select > option");
  options.forEach(function (option) {
    option.classList.remove("hide");
  });
}

function appearResults() {
  const resultTap = document.querySelectorAll(".result_box");
  resultTap[0].classList.replace("hide", "active");
  resultTap[1].classList.replace("hide", "active");
}

function hideOptions() {
  const mirDisabled = document.querySelector(".mir_disabled");
  const otherDisabled = document.querySelectorAll(".other_disabled");
  if (typeSelector() === "Mirror") {
    initialOption();
    mirDisabled.classList.add("hide");
  } else if (
    typeSelector() === "BLK_HL" ||
    typeSelector() === "GOL_HL" ||
    typeSelector() === "GOL_Mirror"
  ) {
    initialOption();
    otherDisabled.forEach(function (option) {
      option.classList.add("hide");
    });
  } else {
    initialOption();
  }
}

function unitPrice() {
  const type = typeSelector();
  const thick = thickSelector();
  if (type === "2B") {
    if (thick == 0.8) {
      return 189;
    }
    if (thick == 1) {
      return 227;
    }
    if (thick == 1.2) {
      return 267;
    }
    if (thick == 1.5) {
      return 326;
    }
    if (thick == 2) {
      return 428;
    }
  }
  if (type === "HL") {
    if (thick == 0.8) {
      return 210;
    }
    if (thick == 1) {
      return 249;
    }
    if (thick == 1.2) {
      return 293;
    }
    if (thick == 1.5) {
      return 368;
    }
    if (thick == 2) {
      return 480;
    }
  }
  if (type === "Mirror") {
    if (thick == 1) {
      return 288;
    }
    if (thick == 1.2) {
      return 335;
    }
    if (thick == 1.5) {
      return 407;
    }
    if (thick == 2) {
      return 530;
    }
  }
  if (type === "BLK_HL") {
    return 563;
  }
  if (type === "GOL_HL" || type === "GOL_Mirror") {
    return 597;
  }
}

function typeSelector() {
  const typeSelect = document.getElementById("type").options.selectedIndex;
  return typeSelectBox.options[typeSelect].value;
}

function thickSelector() {
  const thickSelect = document.getElementById("thickness").options
    .selectedIndex;
  return thickSelectBox.options[thickSelect].value;
}

function sizeCalc() {
  const widthValue = document.querySelector(".calc_width").value;
  const heightValue = document.querySelector(".calc_height").value;
  const width = Math.ceil(widthValue / 50) * 50;
  const height = Math.ceil(heightValue / 50) * 50;
  const sizeResult = (width * height) / 2500;
  return sizeResult;
}

function plateCost() {
  const result = sizeCalc() * unitPrice();
  const calcResult = Math.ceil(result / 100) * 100;
  if (calcResult < 1000) {
    return 1000;
  } else {
    return calcResult;
  }
}

function foundationCost() {
  if (plateCost() < 10000) {
    return 1000;
  } else {
    return 0;
  }
}

function calcCost() {
  return (plateCost() + foundationCost()) * quantity.value;
}

function handleChange() {
  hideOptions();
}

function inputResult() {
  const resultOptionValue = calcCost();
  const resultPlateValue = plateCost();
  const resultFoundationValue = foundationCost();
  const resultNaverQuantity = calcCost() / 100;
  const widthValue = document.querySelector(".calc_width").value;
  const heightValue = document.querySelector(".calc_height").value;
  const thickSelect = document.getElementById("thickness").options
    .selectedIndex;
  const typeSelect = document.getElementById("type").options.selectedIndex;
  result.innerText = `고객님께서 선택해주신 옵션은 ${resultOptionValue} 원 입니다.`;
  resultPlate.innerText = `판재비 ${resultPlateValue} 원`;
  resultFoundation.innerText = `재단비 : ${resultFoundationValue} 원`;
  resultQuantity.innerText = `${quantity.value} 개`;
  naverInfo.innerText = `네이버 스토어 구매 수량에 ${resultNaverQuantity} 개 입력해 주시기 바랍니다.`;
  naverBoxInfo.innerText = `${widthValue} / ${heightValue} / ${typeSelectBox.options[typeSelect].value} / ${thickSelectBox.options[thickSelect].value} T`;
  naverBoxPrice.innerText = `${resultOptionValue}원`;
  naverBoxQuantity.innerText = resultNaverQuantity;
}

function handleSubmit(event) {
  event.preventDefault();
  appearResults();
  inputResult();
}

function init() {
  typeSelectBox.addEventListener("change", handleChange);
  submitBtn.addEventListener("submit", handleSubmit);
}

init();
