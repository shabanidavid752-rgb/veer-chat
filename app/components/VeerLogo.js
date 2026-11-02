import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// VEER wordmark + chat-bolt emblem, drawn as vector paths so it scales crisply
export function VeerMark({ size = 96, color = '#7CFF7A' }) {
  return (
    <View width={size} height={size}>
      <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
        {/* Rounded-square plate */}
        <Path
          d="M18 6h60a12 12 0 0 1 12 12v60a12 12 0 0 1-12 12H18A12 12 0 0 1 6 78V18A12 12 0 0 1 18 6Z"
          fill="#121212"
          stroke={color}
          strokeWidth={3}
        />
        {/* Left "V" stroke */}
        <Path d="M26 30l14 36 14-36" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />
        {/* Lightning bolt — the "veer" swerve */}
        <Path
          d="M60 26l-14 20h10l-4 20 16-22H58l6-18Z"
          fill={color}
        />
      </Svg>
    </View>
  );
}

export function VeerWordmark({ width = 140, color = '#7CFF7A' }) {
  const height = Math.round(width * 0.34);
  return (
    <View width={width} height={height}>
      <Svg width={width} height={height} viewBox="0 0 180 62" fill="none">
        {/* V */}
        <Path d="M6 12l14 38 14-38" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        {/* E */}
        <Path d="M46 12v38h22M46 31h17" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        {/* E */}
        <Path d="M80 12v38h22M80 31h17" stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
        {/* R */}
        <Path
          d="M114 50V12h13a11 11 0 0 1 0 22h-13m27 16l-16-19"
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Signal arc echoing the chat bubble tail */}
        <Path d="M152 44c2 4 7 7 12 7" stroke={color} strokeWidth={7} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
export default VeerMark;
