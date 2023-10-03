// https://medium.com/simform-engineering/create-responsive-design-in-react-native-f84522a44365
import { Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const horizontalScale = (size) => (width / guidelineBaseWidth) * size; // for margins/ paddings in horizontal
const verticalScale = (size) => (height / guidelineBaseHeight) * size; // for margins/ paddings in verticals
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor; // for font sizes

export { horizontalScale, verticalScale, moderateScale, STATUSBAR_HEIGHT };
