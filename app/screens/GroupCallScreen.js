import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '../components/Avatar';
import { GROUP_PARTICIPANTS } from '../data/contacts';

export default function GroupCallScreen({ group, onEnd }) {
  const [muted, setMuted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.5, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const title = group?.name ?? 'Design Crew';

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.liveRow}>
          <Animated.View style={[styles.liveDot, { transform: [{ scale: pulse }] }]} />
          <Text style={styles.liveText}>4 people · {mmss}</Text>
        </View>
      </View>

      {/* 2x2 grid of video tiles */}
      <View style={styles.grid}>
        {GROUP_PARTICIPANTS.map((p) => (
          <View key={p.id} style={[styles.tile, p.speaking && styles.tileSpeaking]}>
            <View style={styles.tileSurface}>
              <Avatar name={p.name} size={72} ring={p.self} />
              <Text style={styles.tileName}>{p.self ? 'You' : p.name}</Text>
              <Text style={styles.tileRes}>
                {p.speaking ? 'speaking · 1080p' : p.online ? '1080p' : 'connecting…'}
              </Text>
            </View>
            {p.speaking && <View style={styles.speakingBar} />}
          </View>
        ))}
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>🔒 End-to-end encrypted · tap mic to mute</Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={() => setMuted((m) => !m)}
          style={({ pressed }) => [styles.ctrlBtn, muted && styles.ctrlActive, pressed && { transform: [{ scale: 0.92 }] }]}
        >
          <Text style={styles.ctrlIcon}>🎤</Text>
        </Pressable>
        <Pressable
          onPress={onEnd}
          style={({ pressed }) => [styles.ctrlBtn, styles.ctrlEnd, pressed && { transform: [{ scale: 0.92 }] }]}
        >
          <Text style={styles.ctrlIcon}>📵</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D0B' },
  header: { paddingTop: 58, paddingHorizontal: 20, marginBottom: 14, alignItems: 'center', gap: 6 },
  title: { color: '#F2F5F2', fontSize: 20, fontWeight: '800' },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7CFF7A',
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  liveText: { color: '#7CFF7A', fontSize: 13, fontWeight: '700' },
  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 8, gap: 8 },
  tile: {
    width: '48.6%',
    height: '48.5%',
    borderRadius: 18,
    backgroundColor: '#161A16',
    borderWidth: 1.5,
    borderColor: '#232723',
    overflow: 'hidden',
    position: 'relative',
  },
  tileSpeaking: { borderColor: '#7CFF7A', shadowColor: '#7CFF7A', shadowOpacity: 0.5, shadowRadius: 12 },
  tileSurface: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  tileName: { color: '#F2F5F2', fontSize: 15, fontWeight: '700' },
  tileRes: { color: '#8B918B', fontSize: 11 },
  speakingBar: {
    position: 'absolute',
    left: 14,
    bottom: 12,
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7CFF7A',
  },
  hint: { alignItems: 'center', paddingVertical: 10 },
  hintText: { color: '#6E746E', fontSize: 11.5 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
    paddingBottom: 44,
    paddingTop: 8,
  },
  ctrlBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: 'rgba(40,44,40,0.9)',
    borderWidth: 1,
    borderColor: '#333833',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlActive: { backgroundColor: '#F2F5F2', borderColor: '#F2F5F2' },
  ctrlEnd: { backgroundColor: '#FF4B4B', borderColor: '#FF4B4B' },
  ctrlIcon: { fontSize: 24 },
});
