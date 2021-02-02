// const selectedType = document.getElementById("type").options[document.getElementById("type")]
const typeSelectBox = document.getElementById("type"),
  thickSelectBox = document.getElementById("thickness"),
  result = document.querySelector(".result"),
  submitBtn = document.querySelector(".submit_btn");

function typeSelector() {
  const typeSelect = document.getElementById("type").options.selectedIndex;
  return typeSelectBox.options[typeSelect].value;
}

function thickSelector() {
  const thickSelect = document.getElementById("thickness").options
    .selectedIndex;
  return thickSelectBox.options[thickSelect].value;
}

function calcCost(event) {
  const type = typeSelector();
  const thick = thickSelector();
  const width = document.querySelector(".calc_width").value;
  const height = document.querySelector(".calc_height").value;
  return type;
}
function handleSubmit(event) {
  event.preventDefault();
  result.innerText = calcCost();
}

function init() {
  submitBtn.addEventListener("submit", handleSubmit);
}

init();
