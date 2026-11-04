import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function VideoCallScreen({ contact, onEnd }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('front');
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, [permission]);

  if (!permission) return <View style={styles.container}><Text style={{color:'#fff'}}>Inaomba ruhusa...</Text></View>;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{color:'#fff', textAlign:'center', margin:20}}>App haina ruhusa ya Camera</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}><Text style={{color:'#fff'}}>Ruhusu Camera</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn,{backgroundColor:'red'}]} onPress={onEnd}><Text style={{color:'#fff'}}>Kata Simu</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera kubwa - wewe */}
      <CameraView style={styles.mainCamera} facing={facing} />

      <Text style={styles.encrypted}>🔒 End-to-end encrypted</Text>
      <Text style={styles.name}>{contact?.name || 'Video Call'}</Text>

      {/* Chini - buttons */}
      <View style={styles.controls}>
        <TouchableOpacity style={[styles.circle, !micOn && styles.off]} onPress={() => setMicOn(!micOn)}>
          <Text style={styles.icon}>{micOn ? '🎤' : '🔇'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.circle} onPress={() => setFacing(facing === 'front' ? 'back' : 'front')}>
          <Text style={styles.icon}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.circle, styles.endBtn]} onPress={onEnd}>
          <Text style={styles.icon}>📞</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  mainCamera: { flex: 1 },
  encrypted: { position: 'absolute', top: 50, left: 15, color: '#fff', fontSize: 12 },
  name: { position: 'absolute', top: 70, left: 15, color: '#fff', fontSize: 18, fontWeight: 'bold' },
  controls: { position: 'absolute', bottom: 30, flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 20 },
  circle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  off: { backgroundColor: '#555' },
  endBtn: { backgroundColor: 'red' },
  icon: { fontSize: 24 },
  btn: { backgroundColor: '#075E54', padding: 15, borderRadius: 10, margin: 10, alignItems: 'center' },
});
