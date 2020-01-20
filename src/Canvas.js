import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    x: "",
    y: "",
    w: "",
    h: "",
    color: "#881b4c"
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  colorHandler = type => {
    switch (type) {
      case "primary":
        this.setState({ color: "#881b4c" });
        break;
      case "secondary":
        this.setState({ color: "rgb(46, 172, 41)" });
        break;
      case "tertiary":
        this.setState({ color: "rgb(54, 17, 189)" });
        break;
      case "dark":
        this.setState({ color: "rgb(20, 20, 20)" });
        break;
      default:
        this.setState({ color: "#881b4c" });
        break;
    }
  };
  componentDidUpdate() {
    const { x, y, w, h, color } = this.state;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(x, y);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h);
    ctx.lineTo(x, h);
    ctx.lineTo(x, y);
    ctx.fillStyle = color;
    ctx.fill();
  }
  render() {
    const { x, y, w, h } = this.state;
    return (
      <div className="w33">
        <h4>Canvas</h4>
        <div className="input-section">
          <label>X position</label>
          <input
            type="number"
            name="x"
            value={x}
            onChange={this.changeHandler}
          />

          <label>Y position</label>
          <input
            type="number"
            name="y"
            value={y}
            onChange={this.changeHandler}
          />

          <label>Width</label>
          <input
            type="number"
            name="w"
            value={w}
            onChange={this.changeHandler}
          />

          <label>Height</label>
          <input
            type="number"
            name="h"
            value={h}
            onChange={this.changeHandler}
          />

          <b>
            Note:<i> Enter less than or equal to 500</i>
          </b>
        </div>
        <div className="color-section d-flex">
          <div
            className="color-primary"
            onClick={() => this.colorHandler("primary")}
          ></div>
          <div
            className="color-secondary"
            onClick={() => this.colorHandler("secondary")}
          ></div>
          <div
            className="color-tertiary"
            onClick={() => this.colorHandler("tertiary")}
          ></div>
          <div
            className="color-dark"
            onClick={() => this.colorHandler("dark")}
          ></div>
        </div>
        <canvas
          id="myCanvas"
          className="display-section"
          height={h}
          width={w}
          version="1.1"
        />
      </div>
    );
  }
}

export default App;
