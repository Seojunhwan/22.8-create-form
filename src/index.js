import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import html2canvas from "html2canvas";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      thick: "",
      quantity: 0,
      width: 0,
      height: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSeletChange = this.handleSeletChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSeletChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    console.log(
      `type : ${this.state.type} thick : ${this.state.thick} quantity : ${this.state.quantity} width : ${this.state.width} height : ${this.state.height} `
    );
    event.preventDefault();
  }
  render() {
    return (
      <form className="option_box" id="capture" onSubmit={this.handleSubmit}>
        <div className="option_tap">
          <label htmlFor="type" className="option_title">
            표면종류
          </label>
          <select
            required
            name="type"
            className="select_box"
            value={this.state.type}
            onChange={this.handleSeletChange}
          >
            <option value="" disabled>
              옵션을 선택해 주세요
            </option>
            <option value="2B">2B</option>
            <option value="HL">H/L</option>
            <option value="Mir">Mirror</option>
            <option value="BLK_H">Black H/L</option>
            <option value="GOL_H">Gold H/L</option>
            <option value="GOL_M">Gold Mirror</option>
          </select>
        </div>
        <div className="option_tap">
          <label htmlFor="thickness" className="option_title">
            두께
          </label>
          <select
            required
            name="thick"
            value={this.state.thick}
            onChange={this.handleSeletChange}
          >
            <option value="" disabled>
              옵션을 선택해 주세요
            </option>
            <option value="0.8">0.8 T</option>
            <option value="1">1 T</option>
            <option value="1.2">1.2 T</option>
            <option value="1.5">1.5 T</option>
            <option value="2">2 T</option>
          </select>
        </div>
        <div className="option_tap">
          <label htmlFor="quantity" className="option_title">
            수량
          </label>
          <input
            name="quantity"
            type="number"
            placeholder="수량"
            min="1"
            required
            onChange={this.handleInputChange}
          />
        </div>
        <div className="option_tap">
          <label className="option_title">규격</label>
          <div className="option_input_container">
            <div>
              <span className="option_tooltip">가로 : 50 mm ~ 1,219 mm</span>
              <input
                name="width"
                className="option_width"
                required
                placeholder="가로 (mm)"
                type="number"
                min="50"
                max="1219"
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <span className="option_tooltip">세로 : 50 mm ~ 2,438 mm</span>
              <input
                name="height"
                className="option_height"
                required
                placeholder="세로 (mm)"
                type="number"
                min="50"
                max="2438"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
        <input className="submit_btn" value="계산 & 추가하기" type="submit" />
      </form>
    );
  }
}

function App() {
  const screenCapture = () => {
    html2canvas(document.querySelector("#capture")).then((canvas) => {
      const target = document.createElement("a");
      target.href = canvas.toDataURL("image/jpeg");
      target.download = "견적.jpg";
      target.click();
    });
  };
  return (
    <>
      <Form capture={screenCapture} />
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
