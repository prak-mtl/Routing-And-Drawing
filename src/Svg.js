import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    x: "",
    y: "",
    w: "610",
    h: "150",
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
  render() {
    const { x, y, w, h, color } = this.state;
    return (
      <div className="w33">
        <h4>SVG</h4>
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
        <svg className="display-section" height={h} width={w} version="1.1">
          <polygon points={[x,y, x,h, w,h, w,0]} fill={color} />
        </svg>
      </div>
    );
  }
}

export default App;
