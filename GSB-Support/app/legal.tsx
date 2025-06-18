import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '@/components/layout/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MentionsLegalesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Mentions légales" showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mentions légales – GSB Support</Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>Éditeur de l'application :{"\n"}</Text>
          GSB (Galaxy Swiss Bourdin){"\n"}
          12 Rue de l’Innovation, 69007 Lyon, France{"\n"}
          contact@gsb.fr – SIRET : 123 456 789 00012
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>Hébergement :{"\n"}</Text>
          Firebase (Google Cloud Platform){"\n"}
          Google Ireland Limited{"\n"}
          Gordon House, Barrow Street, Dublin 4, Ireland
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>Développement :{"\n"}</Text>
          Keenan Martin – Responsable I.T.{"\n"}
          Croix-Rousse Précision
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>Conditions d’utilisation :{"\n"}</Text>
          L’application GSB Support est destinée à un usage interne. Toute utilisation non autorisée est interdite.
        </Text>

        <Text style={styles.section}>
          <Text style={styles.bold}>Propriété intellectuelle :{"\n"}</Text>
          Le contenu de l'application est protégé. Toute reproduction sans autorisation est interdite.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  section: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 16,
    lineHeight: 22,
  },
  bold: {
    fontWeight: 'bold',
  },
});
