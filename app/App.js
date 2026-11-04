import ChatScreen from './screens/ChatScreen';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import ChatListScreen from './screens/ChatListScreen';
import GroupCallScreen from './screens/GroupCallScreen';
import MediaScreen from './screens/MediaScreen';
import SignupScreen from './screens/SignupScreen';
import VideoCallScreen from './screens/VideoCallScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ChatScreen from './screens/ChatScreen';
import SettingsScreen from './screens/SettingsScreen';
// Simple state-driven routing — swap for expo-router when the app grows.
export default function App() {
  const [route, setRoute] = useState('welcome'); // welcome | signup | chats | call | group | media
  const [userName, setUserName] = useState('');
  const [activeContact, setActiveContact] = useState(null);

  const openVideo = (contact) => {
    setActiveContact(contact);
    setRoute('call');
  };
const openChat = (contact) => {
  setActiveContact(contact);
  setRoute('chat');
};
  const openGroup = (group) => {
    setActiveContact(group);
    setRoute('group');
  };

  let screen;
  if (route === 'welcome') {
    screen = <WelcomeScreen onGetStarted={() => setRoute('signup')} />;
  } else if (route === 'signup') {
    screen = (
      <SignupScreen
        onSignup={(name) => {
          setUserName(name);
          setRoute('chats');
        }}
      />
    );
  } else if (route === 'chats') {
    screen = (
      <ChatListScreen
        userName={userName || 'there'}
        onOpenChat={openChat}
        onOpenGroup={openGroup}
        onOpenMedia={() => setRoute('media')}onOpenSettings={() => setRoute('settings')}
      />
    );
  } else if (route === 'chat') {
  screen = <ChatScreen contact={activeContact} onBack={() => setRoute('chats')} />; else if (route === 'call') {
    screen = <VideoCallScreen contact={activeContact} onEnd={() => setRoute('chats')} />;
  } else if (route === 'group') {
    screen = <GroupCallScreen group={activeContact} onEnd={() => setRoute('chats')} />;
  } else if (route === 'settings') {
  screen = <SettingsScreen onBack={() => setRoute('chats')} />;} else {
    screen = <MediaScreen onBack={() => setRoute('chats')} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
});
