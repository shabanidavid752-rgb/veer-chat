import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VeerMark, VeerWordmark } from '../components/VeerLogo';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.glow} />
      <View style={styles.hero}>
        <VeerMark size={132} />
        <View style={{ marginTop: 26 }}>
          <VeerWordmark width={188} />
        </View>
        <Text style={styles.tagline}>Chat. Call. Share — in true HD.</Text>
      </View>

      <View style={styles.perks}>
        {[
          ['⚡', 'Instant messages over Firebase'],
          ['🎥', '1-to-1 & 4-way group video'],
          ['🖼', 'HD media with zero compression'],
        ].map(([icon, label]) => (
          <View key={label} style={styles.perk}>
            <Text style={styles.perkIcon}>{icon}</Text>
            <Text style={styles.perkLabel}>{label}</Text>
          </View>
        ))}
      </View>

      <Pressable style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]} onPress={onGetStarted}>
        <Text style={styles.ctaText}>GET STARTED</Text>
      </Pressable>
      <Text style={styles.terms}>By continuing you agree to VEER&rsquo;s Terms & Privacy Policy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 76,
    paddingBottom: 44,
  },
  glow: {
    position: 'absolute',
    top: -140,
    width: 480,
    height: 480,
    borderRadius: 240,
    backgroundColor: 'rgba(124,255,122,0.13)',
  },
  hero: { alignItems: 'center' },
  tagline: {
    marginTop: 22,
    color: '#B9C0B9',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  perks: { alignSelf: 'stretch', gap: 16 },
  perk: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F1C',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A2E2A',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  perkIcon: { fontSize: 18 },
  perkLabel: { color: '#DDE3DD', fontSize: 14, flex: 1 },
  cta: {
    alignSelf: 'stretch',
    backgroundColor: '#7CFF7A',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaPressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  ctaText: {
    color: '#0A2E09',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  terms: { color: '#6E746E', fontSize: 11.5, textAlign: 'center' },
});
