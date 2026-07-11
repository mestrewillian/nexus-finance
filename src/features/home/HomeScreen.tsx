import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { appConfig } from '../../config/app';
import { colors } from '../../theme/colors';

type HomeScreenProps = {
  activeSpaceName: string;
  userEmail: string;
  onSignOut: () => void;
};

export function HomeScreen({
  activeSpaceName,
  userEmail,
  onSignOut,
}: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Fase 1</Text>
        </View>

        <Text style={styles.title}>Nexus Finance</Text>

        <Text style={styles.subtitle}>
          Fundação do aplicativo pronta para autenticação, espaços financeiros e
          evolução do domínio.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Usuário conectado</Text>
          <Text style={styles.cardValue}>{userEmail}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Espaço financeiro ativo</Text>
          <Text style={styles.cardValue}>{activeSpaceName}</Text>
        </View>

        <Pressable style={styles.signOutButton} onPress={onSignOut}>
          <Text style={styles.signOutButtonText}>Sair</Text>
        </Pressable>

        <Text style={styles.version}>
          {appConfig.name} · versão {appConfig.version}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    width: '100%',
  },
  cardLabel: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 6,
  },
  cardValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    gap: 18,
    justifyContent: 'center',
    padding: 24,
  },
  signOutButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    width: '100%',
  },
  signOutButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
  },
  version: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 8,
  },
});