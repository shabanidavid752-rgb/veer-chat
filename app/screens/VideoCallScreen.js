import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from '../components/Avatar';

const CONTROLS = [
  { key: 'mic', icon: '🎤', label: 'Mute' },
  { key: 'flip', icon: '🔄', label: 'Flip' },
  { key: 'video', icon: '📷', label: 'Camera' },
  { key: 'hangup', icon: '📵', label: 'End' },
];

export default function VideoCallScreen({ contact, onEnd }) {
  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.35, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const onControl = (key) => {
    if (key === 'mic') setMuted((m) => !m);
    if (key === 'video') setCamOff((c) => !c);
    if (key === 'flip') return; // camera flip — native module hook
    if (key === 'hangup') onEnd();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Fullscreen remote video surface */}
      <View style={styles.remote}>
        <View style={styles.remoteGradient}>
          <Avatar name={contact.name} size={128} ring />
          <Text style={styles.remoteName}>{contact.name}</Text>
          <View style={styles.liveRow}>
            <Animated.View style={[styles.liveDot, { transform: [{ scale: pulse }] }]} />
            <Text style={styles.liveText}>HD · {mmss}</Text>
          </View>
          {contact.online && <Text style={styles.statusText}>connected · 1080p · WebRTC</Text>}
        </View>
      </View>

      {/* Self PiP tile */}
      <View style={styles.pip}>
        {camOff ? (
          <View style={styles.pipOff}>
            <Text style={styles.pipOffText}>You</Text>
          </View>
        ) : (
          <View style={styles.pipOn}>
            <Text style={styles.pipOnLabel}>You</Text>
            <Text style={styles.pipOnRes}>1080p</Text>
          </View>
        )}
        {muted && <View style={styles.mutedTag}><Text style={styles.mutedText}>MUTED</Text></View>}
      </View>

      {/* Top bar */}
      <View style={styles.topBar}>
        <Text style={styles.encrypted}>🔒 End-to-end encrypted</Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {CONTROLS.map((c) => {
          const active = (c.key === 'mic' && muted) || (c.key === 'video' && camOff);
          const isEnd = c.key === 'hangup';
          return (
            <Pressable
              key={c.key}
              onPress={() => onControl(c.key)}
              style={({ pressed }) => [
                styles.ctrlBtn,
                isEnd && styles.ctrlEnd,
                active && styles.ctrlActive,
                pressed && { transform: [{ scale: 0.92 }] },
              ]}
            >
              <Text style={styles.ctrlIcon}>{c.icon}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D0B' },
  remote: { ...StyleSheet.absoluteFillObject, backgroundColor: '#161A16' },
  remoteGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,13,11,0.35)',
    gap: 12,
  },
  remoteName: { color: '#F2F5F2', fontSize: 26, fontWeight: '800', marginTop: 10 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#7CFF7A',
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  liveText: { color: '#7CFF7A', fontSize: 14, fontWeight: '700', letterSpacing: 1 },
  statusText: { color: '#8B918B', fontSize: 12 },
  pip: {
    position: 'absolute',
    top: 66,
    right: 16,
    width: 108,
    height: 150,
    borderRadius: 16,
    backgroundColor: '#1C1F1C',
    borderWidth: 1.5,
    borderColor: '#7CFF7A',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  pipOn: { flex: 1, padding: 8, justifyContent: 'space-between' },
  pipOnLabel: { color: '#F2F5F2', fontSize: 12, fontWeight: '700' },
  pipOnRes: { color: '#7CFF7A', fontSize: 10, fontWeight: '800', alignSelf: 'flex-end' },
  pipOff: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pipOffText: { color: '#8B918B', fontSize: 13, fontWeight: '700' },
  mutedTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(255,90,90,0.9)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  mutedText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  topBar: { position: 'absolute', top: 58, left: 20 },
  encrypted: { color: '#8B918B', fontSize: 12 },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    paddingBottom: 44,
    paddingTop: 20,
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
