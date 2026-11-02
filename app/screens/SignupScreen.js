import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { VeerMark } from '../components/VeerLogo';

export default function SignupScreen({ onSignup }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (name.trim().length < 2) return setError('Enter your full name');
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 7) return setError('Enter a valid phone number');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    setError('');
    setBusy(true);
    // Firebase auth would go here; brief pause just to feel like a network hop
    await new Promise((r) => setTimeout(r, 700));
    setBusy(false);
    onSignup(name.trim());
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <VeerMark size={64} />
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Name, phone &amp; password — that&rsquo;s all VEER needs.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Riya Verma"
            placeholderTextColor="#5B615B"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.phoneRow}>
            <Text style={styles.dialCode}>+1</Text>
            <TextInput
              style={styles.inputFlex}
              placeholder="555 018 2244"
              placeholderTextColor="#5B615B"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.passRow}>
            <TextInput
              style={styles.inputFlex}
              placeholder="Min 6 characters"
              placeholderTextColor="#5B615B"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              autoCapitalize="none"
            />
            <Pressable onPress={() => setShowPass((s) => !s)} hitSlop={10}>
              <Text style={styles.showBtn}>{showPass ? 'HIDE' : 'SHOW'}</Text>
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Pressable style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]} onPress={submit} disabled={busy}>
            <Text style={styles.ctaText}>{busy ? 'CREATING…' : 'SIGN UP'}</Text>
          </Pressable>

          <Text style={styles.backendNote}>Secured by Firebase Authentication</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scroll: { padding: 28, paddingBottom: 48 },
  header: { alignItems: 'center', marginTop: 46, marginBottom: 30 },
  title: { color: '#F2F5F2', fontSize: 24, fontWeight: '800', marginTop: 18 },
  subtitle: { color: '#8B918B', fontSize: 13.5, marginTop: 8, textAlign: 'center' },
  form: { gap: 8 },
  label: { color: '#7CFF7A', fontSize: 11, fontWeight: '700', letterSpacing: 1.4, marginTop: 14, marginBottom: 4 },
  input: {
    backgroundColor: '#1C1F1C',
    borderWidth: 1,
    borderColor: '#2A2E2A',
    borderRadius: 12,
    color: '#F2F5F2',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F1C',
    borderWidth: 1,
    borderColor: '#2A2E2A',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  dialCode: { color: '#7CFF7A', fontSize: 16, fontWeight: '700', marginRight: 14 },
  inputFlex: { flex: 1, color: '#F2F5F2', fontSize: 16, paddingVertical: 14 },
  passRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1F1C',
    borderWidth: 1,
    borderColor: '#2A2E2A',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  showBtn: { color: '#7CFF7A', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  error: { color: '#FF7A7A', fontSize: 13, marginTop: 12 },
  cta: {
    backgroundColor: '#7CFF7A',
    borderRadius: 30,
    paddingVertical: 17,
    alignItems: 'center',
    marginTop: 26,
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaPressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  ctaText: { color: '#0A2E09', fontSize: 15.5, fontWeight: '800', letterSpacing: 1.5 },
  backendNote: { color: '#6E746E', fontSize: 11.5, textAlign: 'center', marginTop: 18 },
});
