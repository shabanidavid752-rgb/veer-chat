import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ onBack, onThemeChange }) {
  const [name, setName] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    AsyncStorage.getItem('veer_name').then(v => v && setName(v));
    AsyncStorage.getItem('veer_theme').then(v => v && setTheme(v));
  }, []);

  const saveName = async () => {
    await AsyncStorage.setItem('veer_name', name);
    Alert.alert('Sawa!', 'Jina lako limebadilishwa kuwa: ' + name);
  };

  const changeTheme = async (t) => {
    setTheme(t);
    await AsyncStorage.setItem('veer_theme', t);
    if (onThemeChange) onThemeChange(t);
  };

  const deleteChats = () => {
    Alert.alert('Futa Chats Zote?', 'Hii itafuta chats zote, haitawezekana kurudisha.', [
      { text: 'Ghairi' },
      { text: 'Futa', style: 'destructive', onPress: async () => {
        await AsyncStorage.removeItem('veer_chats');
        Alert.alert('Imetolewa', 'Chats zote zimefutwa.');
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}><Text style={styles.back}>← Rudi</Text></TouchableOpacity>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.label}>Badilisha Jina</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Andika jina lako jipya" placeholderTextColor="#888" />
      <TouchableOpacity style={styles.btn} onPress={saveName}><Text style={styles.btnText}>Hifadhi Jina</Text></TouchableOpacity>

      <Text style={styles.label}>Badilisha Theme</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.themeBtn, theme === 'dark' && styles.active]} onPress={() => changeTheme('dark')}><Text style={styles.btnText}>Nyeusi</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.themeBtn, theme === 'light' && styles.active]} onPress={() => changeTheme('light')}><Text style={styles.btnText}>Nyeupe</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.themeBtn, theme === 'neon' && styles.active]} onPress={() => changeTheme('neon')}><Text style={styles.btnText}>Neon</Text></TouchableOpacity>
      </View>

      <Text style={styles.label}>Hatari</Text>
      <TouchableOpacity style={styles.deleteBtn} onPress={deleteChats}><Text style={styles.btnText}>Futa Chats Zote</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, paddingTop: 50 },
  back: { color: '#7CFF7A', fontSize: 16, marginBottom: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  label: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 14, borderRadius: 12 },
  btn: { backgroundColor: '#7CFF7A', padding: 14, borderRadius: 12, marginTop: 10, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold' },
  row: { flexDirection: 'row', gap: 10 },
  themeBtn: { flex: 1, backgroundColor: '#1E1E1E', padding: 14, borderRadius: 12, alignItems: 'center' },
  active: { borderWidth: 2, borderColor: '#7CFF7A' },
  deleteBtn: { backgroundColor: '#FF4444', padding: 14, borderRadius: 12, alignItems: 'center' },
});
