export { slideUpLeft } from "./slideUpLeft";

import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollSmoother);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
});
