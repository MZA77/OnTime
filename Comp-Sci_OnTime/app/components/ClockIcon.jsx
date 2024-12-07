import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { Animated } from 'react-native';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const ClockIcon = ({ hourRotation, minuteRotation }) => {
  return (
    <Svg height="100" width="100" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="none" />
      <AnimatedLine
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        stroke="black"
        strokeWidth="2.5"
        style={{
          transform: [
            {
              rotate: hourRotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
      <AnimatedLine
        x1="50"
        y1="50"
        x2="50"
        y2="10"
        stroke="black"
        strokeWidth="2.5"
        style={{
          transform: [
            {
              rotate: minuteRotation.interpolate({
                inputRange: [0, 360],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}
      />
    </Svg>
  );
};

export default ClockIcon;