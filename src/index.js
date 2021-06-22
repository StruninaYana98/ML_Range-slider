import "./slider/slider.css";
import "./slider/slider";
import "./ControlsPanel/ControlsPanel.css";
import "./index.css";
import { ControlsPanel } from "./ControlsPanel/ControlsPanel";

new ControlsPanel($("#1234"), {
  sliderID: "slider1",
});

/*new ControlsPanel($("#panel1"), {
  firstValue: 0,
  secondValue: 3,
  step: 3,
  range: true,
  hasScale: true,
  hasTips: true,
  vertical: false,
  min: 0,
  max: 12,
  sliderID: "slider2",
});*/
