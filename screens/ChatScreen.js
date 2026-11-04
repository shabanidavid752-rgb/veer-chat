import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ChatScreen({ contact, onBack }) {
  const [messages, setMessages] = useState([{ id: '1', text: 'Mambo!', me: false }]);
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), text: text, me: true }]);
    setText('');
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Text style={styles.back}>← Back</Text></TouchableOpacity>
        <Text style={styles.name}>{contact?.name || 'Chat'}</Text>
      </View>
      <FlatList data={messages} keyExtractor={(item) => item.id} renderItem={({ item }) => (
        <View style={[styles.bubble, item.me ? styles.myBubble : styles.otherBubble]}>
          <Text style={styles.msgText}>{item.text}</Text>
        </View>
      )} />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type a message..." placeholderTextColor="#888" />
        <TouchableOpacity style={styles.sendBtn} onPress={send}><Text style={styles.sendText}>Send</Text></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingTop: 50, backgroundColor: '#1f1f1f' },
  back: { color: '#fff', fontSize: 16, marginRight: 15 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  bubble: { padding: 10, margin: 8, borderRadius: 12, maxWidth: '80%' },
  myBubble: { backgroundColor: '#075E54', alignSelf: 'flex-end' },
  otherBubble: { backgroundColor: '#333', alignSelf: 'flex-start' },
  msgText: { color: '#fff' },
  inputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#1f1f1f', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#fff', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10 },
  sendBtn: { backgroundColor: '#075E54', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20 },
  sendText: { color: '#fff', fontWeight: 'bold' },
});
