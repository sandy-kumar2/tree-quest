import React from "react";
import { useSpring, animated } from "@react-spring/web";

const TreeNode = ({ value, x, y, isHighlighted }) => {
  const springProps = useSpring({
    from: { opacity: 0, transform: "scale(0.5)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.g style={springProps}>
      <circle
        cx={x}
        cy={y}
        r={25}
        fill={isHighlighted ? "yellow" : "white"} 
        stroke="black"
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="15"
        fill="black"
      >
        {value}
      </text>
    </animated.g>
  );
};

export default TreeNode;
