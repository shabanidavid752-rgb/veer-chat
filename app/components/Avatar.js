import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AVATAR_COLORS = ['#7CFF7A', '#6FD3FF', '#FF9CF0', '#FFD66F', '#B39DFF', '#FF8F6F'];

// Circular initials avatar with a neon online-status dot
export default function Avatar({ name = '?', size = 48, online = false, ring = false }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const bg = AVATAR_COLORS[(name.charCodeAt(0) + name.length) % AVATAR_COLORS.length];

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: bg,
            borderWidth: ring ? 2 : 0,
            borderColor: '#121212',
          },
        ]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.36, color: ring ? '#121212' : '#0E3B0C' }]}>
          {initials}
        </Text>
      </View>
      {online && <View style={[styles.onlineDot, { borderColor: '#121212' }]} />}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '800',
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: '#7CFF7A',
    borderWidth: 2,
  },
});
