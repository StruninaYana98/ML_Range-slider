import "./slider/slider.css";
import "./slider/slider";
import "./ControlsPanel/ControlsPanel.css";
import './index.css'
import { ControlsPanel } from "./ControlsPanel/ControlsPanel";

new ControlsPanel(document.getElementById("panel1"), {
  currLeft: 35,
  currRight: 75,
  step: 1,
  range: true,
  hasScale: true,
  hasIndicator: false,
  vertical: true,
  min: 0,
  max: 100,
  sliderID: "slider1",
});

new ControlsPanel(document.getElementById("panel2"), {
  currLeft: 3,
  currRight: 5,
  step: 1,
  range: true,
  hasScale: true,
  hasIndicator: true,
  vertical: false,
  min: 0,
  max: 20,
  sliderID: "slider2",
});
