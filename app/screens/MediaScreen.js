import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { MEDIA } from '../data/contacts';

const PLACEHOLDERS = ['#1E2A1E', '#242B24', '#1E2824', '#26241E', '#1F242A', '#251F26'];

export default function MediaScreen({ onBack }) {
  const [selecting, setSelecting] = useState(false);
  const [picked, setPicked] = useState([]);

  const toggle = (id) => {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const renderItem = ({ item, index }) => {
    const isVideo = item.type === 'video';
    const selected = picked.includes(item.id);
    return (
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
        onPress={() => (selecting ? toggle(item.id) : undefined)}
      >
        <View style={[styles.thumb, { backgroundColor: PLACEHOLDERS[index % PLACEHOLDERS.length] }]}>
          <View style={styles.hdBadge}>
            <Text style={styles.hdBadgeText}>HD</Text>
          </View>
          {isVideo && <Text style={styles.duration}>{item.duration}</Text>}
          {isVideo && <Text style={styles.play}>▶</Text>}
          {selecting && (
            <View style={[styles.check, selected && styles.checkOn]}>
              {selected && <Text style={styles.checkMark}>✓</Text>}
            </View>
          )}
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {item.label}
        </Text>
        <Text style={styles.meta}>{item.meta}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10}>
          <Text style={styles.back}>← HD Media</Text>
        </Pressable>
        <Pressable onPress={() => { setSelecting((s) => !s); setPicked([]); }} hitSlop={10}>
          <Text style={styles.selectBtn}>{selecting ? 'CANCEL' : 'SELECT'}</Text>
        </Pressable>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Original quality. Always.</Text>
        <Text style={styles.bannerSub}>VEER sends your photos &amp; videos untouched — no compression, up to 2 GB per file.</Text>
      </View>

      <FlatList
        data={MEDIA}
        keyExtractor={(m) => m.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, marginBottom: 16 }}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
      />

      {selecting && (
        <View style={styles.sendBar}>
          <Text style={styles.sendCount}>{picked.length} selected · no compression</Text>
          <Pressable style={({ pressed }) => [styles.sendBtn, pressed && { transform: [{ scale: 0.96 }] }]}>
            <Text style={styles.sendBtnText}>SEND IN HD</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 58,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  back: { color: '#7CFF7A', fontSize: 17, fontWeight: '800' },
  selectBtn: { color: '#8B918B', fontSize: 12.5, fontWeight: '800', letterSpacing: 1 },
  banner: {
    marginHorizontal: 20,
    marginBottom: 18,
    backgroundColor: 'rgba(124,255,122,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(124,255,122,0.35)',
    borderRadius: 16,
    padding: 16,
  },
  bannerTitle: { color: '#7CFF7A', fontSize: 15, fontWeight: '800' },
  bannerSub: { color: '#B9C0B9', fontSize: 12.5, marginTop: 6, lineHeight: 18 },
  card: { flex: 1 },
  thumb: {
    aspectRatio: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2E2A',
  },
  hdBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#7CFF7A',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  hdBadgeText: { color: '#0A2E09', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  duration: { position: 'absolute', bottom: 8, right: 8, color: '#F2F5F2', fontSize: 11, fontWeight: '700' },
  play: { color: '#7CFF7A', fontSize: 30 },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#8B918B',
    backgroundColor: 'rgba(18,18,18,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: '#7CFF7A', borderColor: '#7CFF7A' },
  checkMark: { color: '#0A2E09', fontSize: 14, fontWeight: '900' },
  label: { color: '#F2F5F2', fontSize: 13, fontWeight: '700', marginTop: 8 },
  meta: { color: '#6E746E', fontSize: 11, marginTop: 2 },
  sendBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E211E',
    backgroundColor: '#121212',
  },
  sendCount: { color: '#8B918B', fontSize: 12.5 },
  sendBtn: {
    backgroundColor: '#7CFF7A',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  sendBtnText: { color: '#0A2E09', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
});
