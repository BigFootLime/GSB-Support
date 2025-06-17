import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useRef, useState } from 'react';
import { router } from 'expo-router';

export default function Header() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (showMenu) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start(() => setShowMenu(false));
    } else {
      setShowMenu(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  };

  const goToProfile = () => {
    setShowMenu(false); // Fermer le menu avant navigation
    router.push('/profile');
  };

  return (
    <View style={styles.container}>
      <Image
  source={require('@/assets/images/GSB_Logo_light_text.png')}
  style={styles.logo}
/>

      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={toggleMenu}>
          {user?.photoURL ? (
            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
          ) : user?.avatarUrl ? (
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={40} color="#1e293b" />
          )}
        </TouchableOpacity>

        {showMenu && (
          <Animated.View style={[styles.dropdownMenu, { opacity: fadeAnim }]}>
            <Text style={styles.userEmail}>{user?.email}</Text>

            <TouchableOpacity style={styles.menuItem} onPress={goToProfile}>
              <Ionicons name="settings-outline" size={18} color="#334155" style={styles.menuIcon} />
              <Text style={styles.menuText}>Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutText}>Déconnecter</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#f1f5f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    position: 'relative',
    zIndex: 1,
  },
  logo: {
  width: "80%",
  resizeMode: 'contain',
},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  avatarWrapper: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 200,
    zIndex: 20,
  },
  userEmail: {
    color: '#1e293b',
    marginBottom: 8,
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 10,
  },
  menuIcon: {
    marginRight: 8,
  },
  menuText: {
    fontSize: 14,
    color: '#334155',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ef4444',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
