import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Avatar from '../components/Avatar';
import { CONTACTS } from '../data/contacts';

export default function ChatListScreen({ userName, onOpenVideo, onOpenGroup, onOpenMedia }) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('All');

  const chats = useMemo(() => {
    let list = CONTACTS;
    if (tab === 'Unread') list = list.filter((c) => c.unread > 0);
    if (tab === 'Groups') list = list.filter((c) => c.phone.startsWith('group'));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list;
  }, [query, tab]);

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() => (item.phone.startsWith('group') ? onOpenGroup(item) : onOpenVideo(item))}
    >
      <Avatar name={item.name} size={52} online={item.online} />
      <View style={styles.rowMain}>
        <View style={styles.rowTop}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.preview} numberOfLines={1}>
            {item.lastMsg}
          </Text>
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>VEER</Text>
          <Text style={styles.sub}>Hi {userName.split(' ')[0]} · 4 online now</Text>
        </View>
        <Pressable onPress={onOpenMedia} style={styles.hdChip} hitSlop={8}>
          <Text style={styles.hdChipText}>HD</Text>
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          style={styles.search}
          placeholder="Search chats"
          placeholderTextColor="#5B615B"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <View style={styles.tabs}>
        {['All', 'Unread', 'Groups'].map((t) => (
          <Pressable key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={chats}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>No chats found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 58, marginBottom: 16 },
  hello: { color: '#7CFF7A', fontSize: 26, fontWeight: '900', letterSpacing: 2 },
  sub: { color: '#8B918B', fontSize: 13, marginTop: 3 },
  hdChip: {
    backgroundColor: '#7CFF7A',
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7CFF7A',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  hdChipText: { color: '#0A2E09', fontWeight: '900', fontSize: 15, letterSpacing: 1 },
  searchWrap: { marginBottom: 14 },
  search: {
    backgroundColor: '#1C1F1C',
    borderWidth: 1,
    borderColor: '#2A2E2A',
    borderRadius: 12,
    color: '#F2F5F2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1C1F1C',
    borderWidth: 1,
    borderColor: '#2A2E2A',
  },
  tabActive: { backgroundColor: 'rgba(124,255,122,0.14)', borderColor: '#7CFF7A' },
  tabText: { color: '#8B918B', fontSize: 13, fontWeight: '600' },
  tabTextActive: { color: '#7CFF7A' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 14 },
  rowPressed: { opacity: 0.7 },
  rowMain: { flex: 1 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: '#F2F5F2', fontSize: 16, fontWeight: '700', flex: 1, marginRight: 8 },
  time: { color: '#6E746E', fontSize: 12 },
  rowBottom: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  preview: { color: '#8B918B', fontSize: 13.5, flex: 1, marginRight: 10 },
  badge: {
    backgroundColor: '#7CFF7A',
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { color: '#0A2E09', fontSize: 11, fontWeight: '800' },
  sep: { height: 1, backgroundColor: '#1E211E', marginLeft: 66 },
  empty: { color: '#6E746E', textAlign: 'center', marginTop: 40, fontSize: 14 },
});
