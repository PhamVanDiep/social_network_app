import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LikeIcon = (props) => (
  <Svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M8 10H4V20H8M8 10V20M8 10L13.1956 3.9385C13.6886 3.36333 14.4642 3.11607 15.1992 3.2998L15.2467 3.31169C16.5885 3.64714 17.1929 5.2106 16.4258 6.36138L14 10H18.5604C19.8225 10 20.7691 11.1547 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20H8"
      stroke="#001A72"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default LikeIcon;
